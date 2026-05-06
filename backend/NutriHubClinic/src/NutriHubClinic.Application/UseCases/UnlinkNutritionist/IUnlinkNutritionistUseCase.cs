using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.UnlinkNutritionist
{
    public interface IUnlinkNutritionistUseCase
    {
        Task<Result<UnlinkNutritionistOutput>> ExecuteAsync(Guid patientId);
    }
}

