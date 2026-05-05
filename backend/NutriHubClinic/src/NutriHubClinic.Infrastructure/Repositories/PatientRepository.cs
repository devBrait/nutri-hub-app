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
            => await _context.Nutritionists.AnyAsync(n => n.Id == nutritionistId);

        public async Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId)
            => await _context.Patients
                .Where(p => p.NutritionistId == nutritionistId)
                .OrderBy(p => p.Name)
                .ToListAsync();

        public async Task<bool> IsAlreadyLinkedAsync(Guid patientId, Guid nutritionistId)
            => await _context.Patients.AnyAsync(p => p.Id == patientId && p.NutritionistId == nutritionistId);

        public async Task AddAsync(Patient patient)
        {
            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
        }
    }
}
