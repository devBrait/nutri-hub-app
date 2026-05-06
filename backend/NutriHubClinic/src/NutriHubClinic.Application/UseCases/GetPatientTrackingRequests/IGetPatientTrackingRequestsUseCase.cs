using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetPatientTrackingRequests
{
    public interface IGetPatientTrackingRequestsUseCase
    {
        Task<Result<GetPatientTrackingRequestsOutput>> ExecuteAsync(Guid patientId);
    }
}
