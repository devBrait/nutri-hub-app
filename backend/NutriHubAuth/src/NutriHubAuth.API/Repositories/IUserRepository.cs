using NutriHubAuth.API.Models;

namespace NutriHubAuth.API.Repositories
{
    public interface IUserRepository
    {
        Task<User?> FindByEmailAsync(string email);
        Task SaveAsync(User user);
    }
}
