using NutriHubAuth.API.Models.Enums;

namespace NutriHubAuth.API.Models.Responses
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public Guid? UserId { get; set; }
        public string? Name { get; set; }
        public UserRoles? Role { get; set; }
        public IEnumerable<string> Errors { get; set; } = [];
    }
}
