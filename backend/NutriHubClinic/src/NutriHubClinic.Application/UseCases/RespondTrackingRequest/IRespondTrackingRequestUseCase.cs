using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.RespondTrackingRequest
{
    public interface IRespondTrackingRequestUseCase
    {
        Task<Result<RespondTrackingRequestOutput>> ExecuteAsync(RespondTrackingRequestInput input);
    }
}
