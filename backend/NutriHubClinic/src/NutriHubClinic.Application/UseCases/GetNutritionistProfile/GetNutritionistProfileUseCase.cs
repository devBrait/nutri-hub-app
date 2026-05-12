using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetNutritionistProfile
{
    public class GetNutritionistProfileUseCase : IGetNutritionistProfileUseCase
    {
        private readonly INutritionistRepository _nutritionistRepository;

        public GetNutritionistProfileUseCase(INutritionistRepository nutritionistRepository)
        {
            _nutritionistRepository = nutritionistRepository;
        }

        public async Task<Result<GetNutritionistProfileOutput>> ExecuteAsync(Guid nutritionistId)
        {
            try
            {
                var nutritionist = await _nutritionistRepository.GetByIdAsync(nutritionistId);
                if (nutritionist is null)
                    return Result<GetNutritionistProfileOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist profile not found.");

                return Result<GetNutritionistProfileOutput>.Ok(new GetNutritionistProfileOutput
                {
                    Id = nutritionist.Id,
                    Name = nutritionist.Name,
                    Email = nutritionist.Email,
                    Crn = nutritionist.Crn
                });
            }
            catch (Exception)
            {
                return Result<GetNutritionistProfileOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
