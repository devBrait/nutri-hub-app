using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.CreateNutritionist
{
    public interface ICreateNutritionistUseCase
    {
        Task<Result<CreateNutritionistOutput>> ExecuteAsync(CreateNutritionistInput input);
    }
}
