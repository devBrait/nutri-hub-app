using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.GetMealItems
{
    public interface IGetMealItemsUseCase
    {
        Task<Result<GetMealItemsOutput>> ExecuteAsync(GetMealItemsInput input);
    }
}
