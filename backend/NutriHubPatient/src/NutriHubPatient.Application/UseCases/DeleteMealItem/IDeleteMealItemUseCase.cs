using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.DeleteMealItem
{
    public interface IDeleteMealItemUseCase
    {
        Task<Result<DeleteMealItemOutput>> ExecuteAsync(DeleteMealItemInput input);
    }
}
