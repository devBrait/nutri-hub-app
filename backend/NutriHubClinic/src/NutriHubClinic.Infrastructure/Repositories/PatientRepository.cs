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

        public async Task<Patient?> GetByPatientIdAsync(Guid patientId)
            => await _context.Patients.FirstOrDefaultAsync(p => p.Id == patientId);

        public async Task AddAsync(Patient patient)
        {
            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }
    }
}
