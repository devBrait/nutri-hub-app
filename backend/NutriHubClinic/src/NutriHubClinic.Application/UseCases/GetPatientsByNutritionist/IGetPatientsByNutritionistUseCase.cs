using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetPatientsByNutritionist
{
    public interface IGetPatientsByNutritionistUseCase
    {
        Task<Result<GetPatientsByNutritionistOutput>> ExecuteAsync(GetPatientsByNutritionistInput input);
    }
}
