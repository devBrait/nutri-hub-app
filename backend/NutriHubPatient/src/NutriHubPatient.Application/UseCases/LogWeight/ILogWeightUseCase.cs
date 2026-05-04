using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.LogWeight
{
    public interface ILogWeightUseCase
    {
        Task<Result<LogWeightOutput>> ExecuteAsync(LogWeightInput input);
    }
}
