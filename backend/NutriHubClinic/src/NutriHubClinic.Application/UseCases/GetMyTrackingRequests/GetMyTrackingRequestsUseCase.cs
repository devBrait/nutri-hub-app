using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Enums;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetMyTrackingRequests
{
    public class GetMyTrackingRequestsUseCase : IGetMyTrackingRequestsUseCase
    {
        private readonly ITrackingRequestRepository _trackingRequestRepository;

        public GetMyTrackingRequestsUseCase(ITrackingRequestRepository trackingRequestRepository)
        {
            _trackingRequestRepository = trackingRequestRepository;
        }

        public async Task<Result<GetMyTrackingRequestsOutput>> ExecuteAsync(Guid nutritionistId)
        {
            try
            {
                var requests = await _trackingRequestRepository.GetByNutritionistIdAsync(
                    nutritionistId, TrackingRequestStatus.Pending);

                return Result<GetMyTrackingRequestsOutput>.Ok(new GetMyTrackingRequestsOutput
                {
                    Requests = requests.Select(r => new TrackingRequestItem
                    {
                        Id = r.Id,
                        PatientId = r.PatientId,
                        PatientName = r.PatientName,
                        PatientEmail = r.PatientEmail,
                        Status = r.Status.ToString(),
                        CreatedAt = r.CreatedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetMyTrackingRequestsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
