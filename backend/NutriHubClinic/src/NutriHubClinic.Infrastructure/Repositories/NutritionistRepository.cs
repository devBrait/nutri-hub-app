using Microsoft.EntityFrameworkCore;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;

namespace NutriHubClinic.Infrastructure.Repositories
{
    public class NutritionistRepository : INutritionistRepository
    {
        private readonly ClinicDbContext _context;

        public NutritionistRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Nutritionists.AnyAsync(n => n.Id == id);
        }

        public async Task CreateAsync(Nutritionist nutritionist)
        {
            await _context.Nutritionists.AddAsync(nutritionist);
            await _context.SaveChangesAsync();
        }
    }
}
