using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetMyNutritionist
{
    public interface IGetMyNutritionistUseCase
    {
        Task<Result<GetMyNutritionistOutput>> ExecuteAsync(Guid patientId);
    }
}
