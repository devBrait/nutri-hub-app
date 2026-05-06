using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface IPatientRepository
    {
        Task<bool> NutritionistExistsAsync(Guid nutritionistId);
        Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId);
        Task<Patient?> GetByPatientIdAsync(Guid patientId);
        Task AddAsync(Patient patient);
        Task UpdateAsync(Patient patient);
    }
}
