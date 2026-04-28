using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;

namespace NutriHubAuth.API.UseCases
{
    public interface ILoginUseCase
    {
        Task<LoginResponse> ExecuteAsync(LoginRequest request);
    }
}
