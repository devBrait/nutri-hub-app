using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Domain.Interfaces
{
    public interface IMealRepository
    {
        Task<Meal?> GetByIdAsync(Guid mealId, Guid patientId);
        Task<Meal?> GetByIdWithItemsAsync(Guid mealId, Guid patientId);
        Task<DailySummary?> GetDailySummaryByMealIdAsync(Guid mealId, Guid patientId);
        Task AddItemAndUpdateTotalsAsync(MealItem item, Meal meal, DailySummary dailySummary);
        Task<MealItem?> GetMealItemByIdAsync(Guid itemId, Guid patientId);
        Task DeleteItemAndUpdateTotalsAsync(MealItem item, Meal meal, DailySummary dailySummary);
    }
}
