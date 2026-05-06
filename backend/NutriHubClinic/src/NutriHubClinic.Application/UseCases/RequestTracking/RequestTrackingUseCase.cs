using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.RequestTracking
{
    public class RequestTrackingUseCase : IRequestTrackingUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly INutritionistRepository _nutritionistRepository;

        public RequestTrackingUseCase(
            IPatientRepository patientRepository,
            INutritionistRepository nutritionistRepository)
        {
            _patientRepository = patientRepository;
            _nutritionistRepository = nutritionistRepository;
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

                if (existingPatient is not null)
                {
                    if (existingPatient.NutritionistId == input.NutritionistId)
                        return Result<RequestTrackingOutput>.Failure(
                            ErrorType.Conflict, "You are already linked to this nutritionist.");

                    existingPatient.UpdateNutritionist(input.NutritionistId);
                    await _patientRepository.UpdateAsync(existingPatient);
                }
                else
                {
                    var patient = new Patient(
                        input.PatientId, input.NutritionistId,
                        input.PatientName, input.PatientEmail);
                    await _patientRepository.AddAsync(patient);
                }

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
