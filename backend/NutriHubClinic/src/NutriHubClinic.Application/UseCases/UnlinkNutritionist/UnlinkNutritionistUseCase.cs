using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.UnlinkNutritionist
{
    public class UnlinkNutritionistUseCase : IUnlinkNutritionistUseCase
    {
        private readonly IPatientRepository _patientRepository;

        public UnlinkNutritionistUseCase(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        public async Task<Result<UnlinkNutritionistOutput>> ExecuteAsync(Guid patientId)
        {
            try
            {
                var patient = await _patientRepository.GetByPatientIdAsync(patientId);
                if (patient is null)
                    return Result<UnlinkNutritionistOutput>.Failure(
                        ErrorType.NotFound, "No nutritionist linked.");

                await _patientRepository.DeleteAsync(patientId);

                return Result<UnlinkNutritionistOutput>.Ok(
                    new UnlinkNutritionistOutput(), "Nutritionist unlinked successfully.");
            }
            catch (Exception)
            {
                return Result<UnlinkNutritionistOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
