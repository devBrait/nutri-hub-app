using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.DeleteWeightHistory
{
    public interface IDeleteWeightHistoryUseCase
    {
        Task<Result<DeleteWeightHistoryOutput>> ExecuteAsync(DeleteWeightHistoryInput input);
    }
}
