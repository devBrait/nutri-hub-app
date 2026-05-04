using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.AddMealItem
{
    public interface IAddMealItemUseCase
    {
        Task<Result<AddMealItemOutput>> ExecuteAsync(AddMealItemInput input);
    }
}
