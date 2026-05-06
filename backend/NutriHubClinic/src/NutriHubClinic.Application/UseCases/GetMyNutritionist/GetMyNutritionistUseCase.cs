using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetMyNutritionist
{
    public class GetMyNutritionistUseCase : IGetMyNutritionistUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly INutritionistRepository _nutritionistRepository;

        public GetMyNutritionistUseCase(
            IPatientRepository patientRepository,
            INutritionistRepository nutritionistRepository)
        {
            _patientRepository = patientRepository;
            _nutritionistRepository = nutritionistRepository;
        }

        public async Task<Result<GetMyNutritionistOutput>> ExecuteAsync(Guid patientId)
        {
            try
            {
                var patient = await _patientRepository.GetByPatientIdAsync(patientId);
                if (patient is null)
                    return Result<GetMyNutritionistOutput>.Failure(
                        ErrorType.NotFound, "No nutritionist linked.");

                var nutritionist = await _nutritionistRepository.GetByIdAsync(patient.NutritionistId);
                if (nutritionist is null)
                    return Result<GetMyNutritionistOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist not found.");

                return Result<GetMyNutritionistOutput>.Ok(new GetMyNutritionistOutput
                {
                    Id = nutritionist.Id,
                    Name = nutritionist.Name,
                    Email = nutritionist.Email,
                    LinkedAt = patient.CreatedAt
                });
            }
            catch (Exception)
            {
                return Result<GetMyNutritionistOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
