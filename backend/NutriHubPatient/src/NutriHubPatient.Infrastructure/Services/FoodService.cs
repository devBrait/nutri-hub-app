using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Application.DTOs;
using NutriHubPatient.Application.Services;
using NutriHubPatient.Domain.Entities;
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

        public async Task<FoodPageResult> GetFoodsAsync(string? query, int page, int pageSize)
        {
            page = Math.Max(1, page);
            pageSize = Math.Clamp(pageSize, 1, 50);

            var lower = query?.Trim().ToLower() ?? "";

            IQueryable<Food> dbQuery = _context.Foods.Where(f => !f.IsCustom);

            if (!string.IsNullOrEmpty(lower))
                dbQuery = dbQuery.Where(f => f.Name.ToLower().Contains(lower));

            var totalCount = await dbQuery.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            List<FoodDto> items;

            if (!string.IsNullOrEmpty(lower))
            {
                var all = await dbQuery.OrderBy(f => f.Name).ToListAsync();
                items = all
                    .OrderBy(f => f.Name.ToLower().StartsWith(lower) ? 0 : 1)
                    .ThenBy(f => f.Name)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(MapToDto)
                    .ToList();
            }
            else
            {
                items = await dbQuery
                    .OrderBy(f => f.Name)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(f => MapToDto(f))
                    .ToListAsync();
            }

            return new FoodPageResult
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };
        }

        private static FoodDto MapToDto(Food f) => new()
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
        };
    }
}
