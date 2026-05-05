using Microsoft.EntityFrameworkCore;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;

namespace NutriHubClinic.Infrastructure.Repositories
{
    public class InvitationRepository : IInvitationRepository
    {
        private readonly ClinicDbContext _context;

        public InvitationRepository(ClinicDbContext context)
        {
            _context = context;
        }

        public async Task<Invitation?> GetByTokenAsync(string token)
            => await _context.Invitations
                .Include(i => i.Nutritionist)
                .FirstOrDefaultAsync(i => i.Token == token);

        public async Task<bool> HasPendingInviteAsync(string email, Guid nutritionistId)
            => await _context.Invitations.AnyAsync(i =>
                i.Email == email.Trim().ToLower() &&
                i.NutritionistId == nutritionistId &&
                i.Status == InvitationStatus.Pending &&
                i.ExpirationDate > DateTime.UtcNow);

        public async Task<IEnumerable<Invitation>> GetByNutritionistIdAsync(Guid nutritionistId)
            => await _context.Invitations
                .Where(i => i.NutritionistId == nutritionistId)
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();

        public async Task AddAsync(Invitation invitation)
        {
            await _context.Invitations.AddAsync(invitation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Invitation invitation)
        {
            _context.Invitations.Update(invitation);
            await _context.SaveChangesAsync();
        }
    }
}
