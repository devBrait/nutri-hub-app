using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetPatientTrackingRequests
{
    public class GetPatientTrackingRequestsUseCase : IGetPatientTrackingRequestsUseCase
    {
        private readonly ITrackingRequestRepository _trackingRequestRepository;

        public GetPatientTrackingRequestsUseCase(ITrackingRequestRepository trackingRequestRepository)
        {
            _trackingRequestRepository = trackingRequestRepository;
        }

        public async Task<Result<GetPatientTrackingRequestsOutput>> ExecuteAsync(Guid patientId)
        {
            try
            {
                var requests = await _trackingRequestRepository.GetByPatientIdAsync(patientId);

                return Result<GetPatientTrackingRequestsOutput>.Ok(new GetPatientTrackingRequestsOutput
                {
                    Requests = requests.Select(r => new PatientTrackingRequestItem
                    {
                        Id = r.Id,
                        NutritionistId = r.NutritionistId,
                        Status = r.Status.ToString(),
                        CreatedAt = r.CreatedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetPatientTrackingRequestsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
