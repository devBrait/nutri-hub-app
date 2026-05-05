using FluentValidation;
using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.InvitePatient
{
    public class InvitePatientUseCase : IInvitePatientUseCase
    {
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IInvitationRepository _invitationRepository;
        private readonly IValidator<InvitePatientInput> _validator;

        public InvitePatientUseCase(
            INutritionistRepository nutritionistRepository,
            IInvitationRepository invitationRepository,
            IValidator<InvitePatientInput> validator)
        {
            _nutritionistRepository = nutritionistRepository;
            _invitationRepository = invitationRepository;
            _validator = validator;
        }

        public async Task<Result<InvitePatientOutput>> ExecuteAsync(InvitePatientInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<InvitePatientOutput>.Failure(ErrorType.Validation, message);
                }

                var nutritionist = await _nutritionistRepository.GetByIdAsync(input.NutritionistId);
                if (nutritionist is null)
                    return Result<InvitePatientOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist profile not found.");

                var hasPending = await _invitationRepository.HasPendingInviteAsync(
                    input.Email, input.NutritionistId);
                if (hasPending)
                    return Result<InvitePatientOutput>.Failure(
                        ErrorType.Conflict, "A pending invitation for this email already exists.");

                var invitation = new Invitation(input.Email, input.NutritionistId);
                await _invitationRepository.AddAsync(invitation);

                var inviteLink = $"{input.FrontendBaseUrl.TrimEnd('/')}/accept-invite/{invitation.Token}";

                return Result<InvitePatientOutput>.Ok(new InvitePatientOutput
                {
                    InvitationId = invitation.Id,
                    Email = invitation.Email,
                    InviteLink = inviteLink,
                    ExpirationDate = invitation.ExpirationDate
                }, "Invitation created successfully.");
            }
            catch (Exception)
            {
                return Result<InvitePatientOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
