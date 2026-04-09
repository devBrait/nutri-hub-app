using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface IPatientRepository
    {
        Task<bool> NutritionistExistsAsync(Guid nutritionistId);
        Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId);
    }
}
