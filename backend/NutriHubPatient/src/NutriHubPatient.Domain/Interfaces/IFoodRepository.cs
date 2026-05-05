using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Domain.Interfaces
{
    public interface IFoodRepository
    {
        Task<(List<Food> Items, int TotalCount)> SearchAsync(string? query, int page, int pageSize);
    }
}
