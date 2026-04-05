using NutriHubAuth.API.Models;

namespace NutriHubAuth.API.Repositories
{
    // Simulação da criação do usuário na base, futuramente deve ser implementado
    public class UserRepository : IUserRepository
    {
        private static readonly List<User> _users = [];

        public Task<User?> FindByEmailAsync(string email)
        {
            var user = _users.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            return Task.FromResult(user);
        }

        public Task SaveAsync(User user)
        {
            _users.Add(user);
            return Task.CompletedTask;
        }
    }
}
