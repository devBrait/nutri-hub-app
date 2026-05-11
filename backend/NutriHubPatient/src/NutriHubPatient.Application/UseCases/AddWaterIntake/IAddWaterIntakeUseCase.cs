using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.AddWaterIntake
{
    public interface IAddWaterIntakeUseCase
    {
        Task<Result<AddWaterIntakeOutput>> ExecuteAsync(AddWaterIntakeInput input);
    }
}
