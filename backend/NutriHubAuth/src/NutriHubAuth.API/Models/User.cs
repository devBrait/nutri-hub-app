using NutriHubAuth.API.Models.Enums;

namespace NutriHubAuth.API.Models
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string Password { get; private set; }
        public UserRoles Role { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public User(string name, string email, string password, UserRoles role)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            Password = password;
            Role = role;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
