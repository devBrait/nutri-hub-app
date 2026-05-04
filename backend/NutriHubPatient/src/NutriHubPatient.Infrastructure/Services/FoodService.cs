using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Application.DTOs;
using NutriHubPatient.Application.Services;
using NutriHubPatient.Infrastructure.Data;

namespace NutriHubPatient.Infrastructure.Services
{
    public class FoodService : IFoodService
    {
        private readonly PatientDbContext _context;

        public FoodService(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<List<FoodDto>> SearchFoodsAsync(string query)
        {
            var lower = query.Trim().ToLower();

            var foods = await _context.Foods
                .Where(f => f.Name.ToLower().Contains(lower) && !f.IsCustom)
                .OrderBy(f => f.Name)
                .Take(40)
                .ToListAsync();

            return foods
                .OrderBy(f => f.Name.ToLower().StartsWith(lower) ? 0 : 1)
                .ThenBy(f => f.Name)
                .Take(20)
                .Select(f => new FoodDto
                {
                    Id = f.Id,
                    Name = f.Name,
                    CaloriesPer100g = f.CaloriesPer100g,
                    MacrosPer100g = new MacrosDto
                    {
                        Carbs = f.CarbsPer100g,
                        Protein = f.ProteinPer100g,
                        Fat = f.FatPer100g
                    }
                })
                .ToList();
        }
    }
}
