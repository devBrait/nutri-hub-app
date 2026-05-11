using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Enums;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;

namespace NutriHubPatient.Infrastructure.Repositories
{
    public class DailySummaryRepository : IDailySummaryRepository
    {
        private readonly PatientDbContext _context;

        public DailySummaryRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<DailySummary?> GetWithMealsByDateAsync(Guid patientId, DateOnly date)
        {
            return await _context.DailySummaries
                .Include(d => d.Meals)
                .FirstOrDefaultAsync(d => d.PatientId == patientId && d.Date == date);
        }

        public async Task<PatientGoal?> GetActiveGoalAsync(Guid patientId)
        {
            return await _context.PatientGoals
                .Where(g => g.PatientId == patientId && g.IsActive)
                .OrderByDescending(g => g.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task UpdateCalorieGoalAsync(DailySummary summary)
        {
            _context.DailySummaries.Update(summary);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(DailySummary summary)
        {
            _context.DailySummaries.Update(summary);
            await _context.SaveChangesAsync();
        }

        public async Task<DailySummary> CreateWithDefaultMealsAsync(
            Guid patientId, DateOnly date, int calorieGoal, IEnumerable<MealType> mealTypes)
        {
            var summary = new DailySummary(patientId, date, calorieGoal);

            foreach (var mealType in mealTypes)
                summary.Meals.Add(new Meal(summary.Id, patientId, mealType));

            await _context.DailySummaries.AddAsync(summary);
            await _context.SaveChangesAsync();

            return summary;
        }
    }
}
