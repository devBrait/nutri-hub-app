using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.RequestTracking
{
    public interface IRequestTrackingUseCase
    {
        Task<Result<RequestTrackingOutput>> ExecuteAsync(RequestTrackingInput input);
    }
}
