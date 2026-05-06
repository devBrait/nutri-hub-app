using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.RequestTracking
{
    public class RequestTrackingUseCase : IRequestTrackingUseCase
    {
        private readonly ITrackingRequestRepository _trackingRequestRepository;
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IPatientRepository _patientRepository;

        public RequestTrackingUseCase(
            ITrackingRequestRepository trackingRequestRepository,
            INutritionistRepository nutritionistRepository,
            IPatientRepository patientRepository)
        {
            _trackingRequestRepository = trackingRequestRepository;
            _nutritionistRepository = nutritionistRepository;
            _patientRepository = patientRepository;
        }

        public async Task<Result<RequestTrackingOutput>> ExecuteAsync(RequestTrackingInput input)
        {
            try
            {
                var nutritionist = await _nutritionistRepository.GetByIdAsync(input.NutritionistId);
                if (nutritionist is null)
                    return Result<RequestTrackingOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist not found.");

                var existingPatient = await _patientRepository.GetByPatientIdAsync(input.PatientId);
                if (existingPatient is not null && existingPatient.NutritionistId == input.NutritionistId)
                    return Result<RequestTrackingOutput>.Failure(
                        ErrorType.Conflict, "You are already linked to this nutritionist.");

                var hasPending = await _trackingRequestRepository.HasPendingRequestAsync(
                    input.PatientId, input.NutritionistId);
                if (hasPending)
                    return Result<RequestTrackingOutput>.Failure(
                        ErrorType.Conflict, "You already have a pending request to this nutritionist.");

                var request = new TrackingRequest(
                    input.PatientId, input.PatientName, input.PatientEmail, input.NutritionistId);
                await _trackingRequestRepository.AddAsync(request);

                return Result<RequestTrackingOutput>.Ok(new RequestTrackingOutput
                {
                    NutritionistId = nutritionist.Id,
                    NutritionistName = nutritionist.Name
                }, "Tracking request sent successfully.");
            }
            catch (Exception)
            {
                return Result<RequestTrackingOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
