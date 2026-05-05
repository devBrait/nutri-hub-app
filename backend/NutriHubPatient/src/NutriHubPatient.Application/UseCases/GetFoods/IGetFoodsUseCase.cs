using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.GetFoods
{
    public interface IGetFoodsUseCase
    {
        Task<Result<GetFoodsOutput>> ExecuteAsync(GetFoodsInput input);
    }
}
