using NutriHubAuth.API.Models.Enums;

namespace NutriHubAuth.API.Models.Responses
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public IEnumerable<string> Errors { get; set; } = [];
    }
}
