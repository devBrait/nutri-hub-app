using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Domain.Interfaces
{
    public interface IPatientRepository
    {
        Task<Patient?> GetByIdAsync(Guid id);
        Task<bool> ExistsAsync(Guid id);
        Task CreateAsync(Patient patient);
        Task UpdateAsync(Patient patient);
        Task SaveOnboardingAsync(Patient patient, WeightHistory weightHistory, PatientGoal patientGoal);
    }
}
