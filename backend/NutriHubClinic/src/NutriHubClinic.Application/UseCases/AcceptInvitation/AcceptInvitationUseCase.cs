using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.AcceptInvitation
{
    public class AcceptInvitationUseCase : IAcceptInvitationUseCase
    {
        private readonly IInvitationRepository _invitationRepository;
        private readonly IPatientRepository _patientRepository;

        public AcceptInvitationUseCase(
            IInvitationRepository invitationRepository,
            IPatientRepository patientRepository)
        {
            _invitationRepository = invitationRepository;
            _patientRepository = patientRepository;
        }

        public async Task<Result<AcceptInvitationOutput>> ExecuteAsync(AcceptInvitationInput input)
        {
            try
            {
                var invitation = await _invitationRepository.GetByTokenAsync(input.Token);
                if (invitation is null)
                    return Result<AcceptInvitationOutput>.Failure(
                        ErrorType.NotFound, "Invitation not found.");

                if (invitation.Status == InvitationStatus.Accepted)
                    return Result<AcceptInvitationOutput>.Failure(
                        ErrorType.Conflict, "This invitation has already been accepted.");

                if (invitation.IsExpired() || invitation.Status == InvitationStatus.Expired)
                {
                    invitation.MarkExpired();
                    await _invitationRepository.UpdateAsync(invitation);
                    return Result<AcceptInvitationOutput>.Failure(
                        ErrorType.Validation, "This invitation has expired.");
                }

                var existingPatient = await _patientRepository.GetByPatientIdAsync(input.PatientId);

                if (existingPatient is not null)
                {
                    if (existingPatient.NutritionistId == invitation.NutritionistId)
                        return Result<AcceptInvitationOutput>.Failure(
                            ErrorType.Conflict, "You are already linked to this nutritionist.");

                    existingPatient.UpdateNutritionist(invitation.NutritionistId);
                    await _patientRepository.UpdateAsync(existingPatient);
                }
                else
                {
                    var patient = new Patient(input.PatientId, invitation.NutritionistId,
                        input.PatientName, input.PatientEmail);
                    await _patientRepository.AddAsync(patient);
                }

                invitation.Accept();
                await _invitationRepository.UpdateAsync(invitation);

                return Result<AcceptInvitationOutput>.Ok(new AcceptInvitationOutput
                {
                    NutritionistId = invitation.NutritionistId,
                    NutritionistName = invitation.Nutritionist.Name
                }, "Invitation accepted successfully.");
            }
            catch (Exception)
            {
                return Result<AcceptInvitationOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
