using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface IPatientRepository
    {
        Task<bool> NutritionistExistsAsync(Guid nutritionistId);
        Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId);
        Task<bool> IsAlreadyLinkedAsync(Guid patientId, Guid nutritionistId);
        Task AddAsync(Patient patient);
    }
}
