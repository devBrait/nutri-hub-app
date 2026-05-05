using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface INutritionistRepository
    {
        Task<bool> ExistsAsync(Guid id);
        Task<Nutritionist?> GetByIdAsync(Guid id);
        Task CreateAsync(Nutritionist nutritionist);
        Task UpdateAsync(Nutritionist nutritionist);
        Task<IEnumerable<Nutritionist>> GetAllAsync();
    }
}
