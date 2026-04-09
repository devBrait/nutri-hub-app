using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Domain.Interfaces
{
    public interface IPatientRepository
    {
        Task<Patient?> GetByIdAsync(Guid id);
        Task UpdateAsync(Patient patient);
    }
}
