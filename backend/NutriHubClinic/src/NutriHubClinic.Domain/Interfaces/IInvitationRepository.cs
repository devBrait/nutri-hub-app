using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Enums;

namespace NutriHubClinic.Domain.Interfaces
{
    public interface IInvitationRepository
    {
        Task<Invitation?> GetByTokenAsync(string token);
        Task<bool> HasPendingInviteAsync(string email, Guid nutritionistId);
        Task<IEnumerable<Invitation>> GetByNutritionistIdAsync(Guid nutritionistId);
        Task AddAsync(Invitation invitation);
        Task UpdateAsync(Invitation invitation);
    }
}
