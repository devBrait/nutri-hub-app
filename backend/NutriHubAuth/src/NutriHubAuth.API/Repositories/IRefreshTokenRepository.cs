using NutriHubAuth.API.Models;

namespace NutriHubAuth.API.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task SaveAsync(RefreshToken token);
        Task<RefreshToken?> FindByTokenAsync(string token);
        Task DeleteAsync(RefreshToken token);
        Task DeleteAllByUserIdAsync(Guid userId);
    }
}
