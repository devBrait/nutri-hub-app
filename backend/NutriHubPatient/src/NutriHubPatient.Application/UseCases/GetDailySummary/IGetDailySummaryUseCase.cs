using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.GetDailySummary
{
    public interface IGetDailySummaryUseCase
    {
        Task<Result<GetDailySummaryOutput>> ExecuteAsync(GetDailySummaryInput input);
    }
}
