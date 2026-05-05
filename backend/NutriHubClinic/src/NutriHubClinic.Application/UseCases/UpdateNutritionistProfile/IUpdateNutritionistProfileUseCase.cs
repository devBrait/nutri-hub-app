using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.UpdateNutritionistProfile
{
    public interface IUpdateNutritionistProfileUseCase
    {
        Task<Result<UpdateNutritionistProfileOutput>> ExecuteAsync(UpdateNutritionistProfileInput input);
    }
}
