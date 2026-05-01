using FluentValidation;
using NutriHubAuth.API.Common;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.Services;

namespace NutriHubAuth.API.UseCases.Login
{
    public class LoginUseCase : ILoginUseCase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly ITokenService _tokenService;
        private readonly IValidator<LoginRequest> _validator;

        public LoginUseCase(
            IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            ITokenService tokenService,
            IValidator<LoginRequest> validator)
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenService = tokenService;
            _validator = validator;
        }

        public async Task<LoginResponse> ExecuteAsync(LoginRequest request)
        {
            try
            {
                var validation = await _validator.ValidateAsync(request);
                if (!validation.IsValid)
                    return new LoginResponse
                    {
                        Success = false,
                        Errors = validation.Errors.Select(e => e.ErrorMessage)
                    };

                var user = await _userRepository.FindByEmailAsync(request.Email);
                if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                    return new LoginResponse
                    {
                        Success = false,
                        Errors = [ErrorCodes.InvalidCredentials]
                    };

                var accessToken = _tokenService.GenerateAccessToken(user);
                var refreshTokenValue = _tokenService.GenerateRefreshToken();
                var refreshToken = new RefreshToken(user.Id, refreshTokenValue, DateTime.UtcNow.AddDays(7));

                await _refreshTokenRepository.SaveAsync(refreshToken);

                return new LoginResponse
                {
                    Success = true,
                    AccessToken = accessToken,
                    RefreshToken = refreshTokenValue,
                    UserId = user.Id,
                    Name = user.Name,
                    Role = user.Role
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse
                {
                    Success = false,
                    Errors = [$"Login failed: {ex.Message}"]
                };
            }
        }
    }
}
