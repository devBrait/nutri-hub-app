using NutriHubAuth.API.Models;

namespace NutriHubAuth.API.Services
{
    public interface ITokenService
    {
        string GenerateAccessToken(User user);
        string GenerateRefreshToken();
    }
}
