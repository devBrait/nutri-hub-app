using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;

namespace NutriHubPatient.Infrastructure.Repositories
{
    public class FoodRepository : IFoodRepository
    {
        private readonly PatientDbContext _context;

        public FoodRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<(List<Food> Items, int TotalCount)> SearchAsync(string? query, int page, int pageSize)
        {
            var lower = query?.Trim().ToLower() ?? "";

            IQueryable<Food> dbQuery = _context.Foods.Where(f => !f.IsCustom);

            if (!string.IsNullOrEmpty(lower))
                dbQuery = dbQuery.Where(f => f.Name.ToLower().Contains(lower));

            var totalCount = await dbQuery.CountAsync();

            List<Food> items;

            if (!string.IsNullOrEmpty(lower))
            {
                var all = await dbQuery.OrderBy(f => f.Name).ToListAsync();
                items = all
                    .OrderBy(f => f.Name.ToLower().StartsWith(lower) ? 0 : 1)
                    .ThenBy(f => f.Name)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            else
            {
                items = await dbQuery
                    .OrderBy(f => f.Name)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();
            }

            return (items, totalCount);
        }
    }
}
