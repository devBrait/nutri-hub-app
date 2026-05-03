using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Domain.Interfaces
{
    public interface IDailySummaryRepository
    {
        Task<DailySummary?> GetWithMealsByDateAsync(Guid patientId, DateOnly date);
        Task<PatientGoal?> GetActiveGoalAsync(Guid patientId);
        Task<DailySummary> CreateWithDefaultMealsAsync(Guid patientId, DateOnly date, int calorieGoal, IEnumerable<MealType> mealTypes);
    }
}
