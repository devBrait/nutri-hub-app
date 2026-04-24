using Microsoft.EntityFrameworkCore;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;

namespace NutriHubClinic.Infrastructure.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly ClinicDbContext _context;

        public PatientRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<bool> NutritionistExistsAsync(Guid nutritionistId)
        {
            return await _context.Nutritionists.AnyAsync(n => n.Id == nutritionistId);
        }

        public async Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId)
        {
            return await _context.Patients
                .Where(p => p.NutritionistId == nutritionistId)
                .ToListAsync();
        }
    }
}
