using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface INutritionistRepository
    {
        Task<bool> ExistsAsync(Guid id);
        Task CreateAsync(Nutritionist nutritionist);
        Task<IEnumerable<Nutritionist>> GetAllAsync();
    }
}
