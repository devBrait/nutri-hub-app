using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetNutritionistProfile
{
    public interface IGetNutritionistProfileUseCase
    {
        Task<Result<GetNutritionistProfileOutput>> ExecuteAsync(Guid nutritionistId);
    }
}
