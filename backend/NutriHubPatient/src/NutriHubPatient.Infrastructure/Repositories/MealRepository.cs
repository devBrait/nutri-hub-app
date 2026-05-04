using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;

namespace NutriHubPatient.Infrastructure.Repositories
{
    public class MealRepository : IMealRepository
    {
        private readonly PatientDbContext _context;

        public MealRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<Meal?> GetByIdAsync(Guid mealId, Guid patientId)
        {
            return await _context.Meals
                .FirstOrDefaultAsync(m => m.Id == mealId && m.PatientId == patientId);
        }

        public async Task<Meal?> GetByIdWithItemsAsync(Guid mealId, Guid patientId)
        {
            return await _context.Meals
                .Include(m => m.Items)
                .FirstOrDefaultAsync(m => m.Id == mealId && m.PatientId == patientId);
        }

        public async Task<DailySummary?> GetDailySummaryByMealIdAsync(Guid mealId, Guid patientId)
        {
            return await _context.DailySummaries
                .FirstOrDefaultAsync(d => d.PatientId == patientId
                    && d.Meals.Any(m => m.Id == mealId));
        }

        public async Task AddItemAndUpdateTotalsAsync(MealItem item, Meal meal, DailySummary dailySummary)
        {
            await _context.MealItems.AddAsync(item);
            _context.Meals.Update(meal);
            _context.DailySummaries.Update(dailySummary);
            await _context.SaveChangesAsync();
        }
    }
}
