using NutriHubAuth.API.Models;
using NutriHubAuth.API.Repositories;

namespace NutriHubAuth.Tests.Fakes;

internal sealed class FakeUserRepository : IUserRepository
{
    private readonly List<User> _existingUsers;

    public List<User> SavedUsers { get; } = [];

    public FakeUserRepository(params User[] existingUsers)
    {
        _existingUsers = [.. existingUsers];
    }

    public Task<User?> FindByEmailAsync(string email)
    {
        var user = _existingUsers.FirstOrDefault(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(user);
    }

    public Task SaveAsync(User user)
    {
        SavedUsers.Add(user);
        return Task.CompletedTask;
    }
}
