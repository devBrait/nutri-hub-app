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

        public async Task UpdateAsync(Patient patient)
        {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
        }
    }
}
