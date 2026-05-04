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
        Task AddWeightAsync(WeightHistory weightHistory);
        Task<IEnumerable<WeightHistory>> GetWeightHistoryAsync(Guid patientId);
        Task UpdateProfileAsync(Patient patient, PatientGoal newGoal);
    }
}
