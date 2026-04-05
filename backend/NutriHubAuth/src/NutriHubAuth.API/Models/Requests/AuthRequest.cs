using NutriHubAuth.API.Models.Enums;

namespace NutriHubAuth.API.Models.Requests
{
    public class AuthRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Document { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public UserRoles Role { get; set; }
    }
}
