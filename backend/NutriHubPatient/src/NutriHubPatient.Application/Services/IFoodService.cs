using NutriHubPatient.Application.DTOs;

namespace NutriHubPatient.Application.Services
{
    public interface IFoodService
    {
        Task<List<FoodDto>> SearchFoodsAsync(string query);
    }
}
