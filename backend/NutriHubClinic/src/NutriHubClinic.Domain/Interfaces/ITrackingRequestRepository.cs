using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface ITrackingRequestRepository
    {
        Task<TrackingRequest?> GetByIdAsync(Guid id);
        Task<bool> HasPendingRequestAsync(Guid patientId, Guid nutritionistId);
        Task<IEnumerable<TrackingRequest>> GetByNutritionistIdAsync(Guid nutritionistId, TrackingRequestStatus? status = null);
        Task<IEnumerable<TrackingRequest>> GetByPatientIdAsync(Guid patientId, TrackingRequestStatus? status = null);
        Task AddAsync(TrackingRequest request);
        Task UpdateAsync(TrackingRequest request);
    }
}
