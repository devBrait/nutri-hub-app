using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.RespondTrackingRequest
{
    public class RespondTrackingRequestUseCase : IRespondTrackingRequestUseCase
    {
        private readonly ITrackingRequestRepository _trackingRequestRepository;
        private readonly IPatientRepository _patientRepository;

        public RespondTrackingRequestUseCase(
            ITrackingRequestRepository trackingRequestRepository,
            IPatientRepository patientRepository)
        {
            _trackingRequestRepository = trackingRequestRepository;
            _patientRepository = patientRepository;
        }

        public async Task<Result<RespondTrackingRequestOutput>> ExecuteAsync(RespondTrackingRequestInput input)
        {
            try
            {
                var request = await _trackingRequestRepository.GetByIdAsync(input.RequestId);
                if (request is null)
                    return Result<RespondTrackingRequestOutput>.Failure(
                        ErrorType.NotFound, "Tracking request not found.");

                if (request.NutritionistId != input.NutritionistId)
                    return Result<RespondTrackingRequestOutput>.Failure(
                        ErrorType.Forbidden, "You are not authorized to respond to this request.");

                if (request.Status != TrackingRequestStatus.Pending)
                    return Result<RespondTrackingRequestOutput>.Failure(
                        ErrorType.Conflict, "This request has already been responded to.");

                if (!input.Accept)
                {
                    request.Reject();
                    await _trackingRequestRepository.UpdateAsync(request);
                    return Result<RespondTrackingRequestOutput>.Ok(
                        new RespondTrackingRequestOutput { PatientId = request.PatientId, PatientName = request.PatientName },
                        "Request rejected.");
                }

                var existingPatient = await _patientRepository.GetByPatientIdAsync(request.PatientId);
                if (existingPatient is not null)
                {
                    existingPatient.UpdateNutritionist(request.NutritionistId);
                    await _patientRepository.UpdateAsync(existingPatient);
                }
                else
                {
                    var patient = new Patient(
                        request.PatientId, request.NutritionistId,
                        request.PatientName, request.PatientEmail);
                    await _patientRepository.AddAsync(patient);
                }

                request.Accept();
                await _trackingRequestRepository.UpdateAsync(request);

                return Result<RespondTrackingRequestOutput>.Ok(
                    new RespondTrackingRequestOutput { PatientId = request.PatientId, PatientName = request.PatientName },
                    "Request accepted. Patient is now linked.");
            }
            catch (Exception)
            {
                return Result<RespondTrackingRequestOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
