using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;

namespace NutriHubPatient.Infrastructure.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly PatientDbContext _context;

        public PatientRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<Patient?> GetByIdAsync(Guid id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Patients.AnyAsync(p => p.Id == id);
        }

        public async Task CreateAsync(Patient patient)
        {
            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }

        public async Task SaveOnboardingAsync(Patient patient, WeightHistory weightHistory, PatientGoal patientGoal)
        {
            var activeGoals = await _context.PatientGoals
                .Where(g => g.PatientId == patient.Id && g.IsActive)
                .ToListAsync();

            foreach (var goal in activeGoals)
                goal.Deactivate();

            _context.Patients.Update(patient);
            await _context.WeightHistories.AddAsync(weightHistory);
            await _context.PatientGoals.AddAsync(patientGoal);

            await _context.SaveChangesAsync();
        }
    }
}
