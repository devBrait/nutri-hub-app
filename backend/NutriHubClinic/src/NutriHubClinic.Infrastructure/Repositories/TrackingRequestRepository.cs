using Microsoft.EntityFrameworkCore;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;

namespace NutriHubClinic.Infrastructure.Repositories
{
    public class TrackingRequestRepository : ITrackingRequestRepository
    {
        private readonly ClinicDbContext _context;

        public TrackingRequestRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<TrackingRequest?> GetByIdAsync(Guid id)
            => await _context.TrackingRequests
                .Include(r => r.Nutritionist)
                .FirstOrDefaultAsync(r => r.Id == id);

        public async Task<bool> HasPendingRequestAsync(Guid patientId, Guid nutritionistId)
            => await _context.TrackingRequests.AnyAsync(r =>
                r.PatientId == patientId &&
                r.NutritionistId == nutritionistId &&
                r.Status == TrackingRequestStatus.Pending);

        public async Task<IEnumerable<TrackingRequest>> GetByNutritionistIdAsync(Guid nutritionistId, TrackingRequestStatus? status = null)
        {
            var query = _context.TrackingRequests.Where(r => r.NutritionistId == nutritionistId);
            if (status.HasValue) query = query.Where(r => r.Status == status.Value);
            return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
        }

        public async Task<IEnumerable<TrackingRequest>> GetByPatientIdAsync(Guid patientId, TrackingRequestStatus? status = null)
        {
            var query = _context.TrackingRequests.Where(r => r.PatientId == patientId);
            if (status.HasValue) query = query.Where(r => r.Status == status.Value);
            return await query.OrderByDescending(r => r.CreatedAt).ToListAsync();
        }

        public async Task AddAsync(TrackingRequest request)
        {
            await _context.TrackingRequests.AddAsync(request);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(TrackingRequest request)
        {
            _context.TrackingRequests.Update(request);
            await _context.SaveChangesAsync();
        }
    }
}
