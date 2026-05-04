using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetNutritionists
{
    public interface IGetNutritionistsUseCase
    {
        Task<Result<GetNutritionistsOutput>> ExecuteAsync();
    }
}
