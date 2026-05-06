using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetMyTrackingRequests
{
    public interface IGetMyTrackingRequestsUseCase
    {
        Task<Result<GetMyTrackingRequestsOutput>> ExecuteAsync(Guid nutritionistId);
    }
}
