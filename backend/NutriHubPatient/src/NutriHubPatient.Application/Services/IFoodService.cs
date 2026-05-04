using NutriHubPatient.Application.DTOs;

namespace NutriHubPatient.Application.Services
{
    public interface IFoodService
    {
        Task<FoodPageResult> GetFoodsAsync(string? query, int page, int pageSize);
    }
}
