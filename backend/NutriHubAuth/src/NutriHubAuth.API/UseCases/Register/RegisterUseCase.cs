using FluentValidation;
using NutriHubAuth.API.Common;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.Services;

namespace NutriHubAuth.API.UseCases.Register
{
    public class RegisterUseCase : IRegisterUseCase<AuthRequest, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly ITokenService _tokenService;
        private readonly IValidator<AuthRequest> _validator;

        public RegisterUseCase(
            IUserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            ITokenService tokenService,
            IValidator<AuthRequest> validator)
        {
            _userRepository = userRepository;
            _refreshTokenRepository = refreshTokenRepository;
            _tokenService = tokenService;
            _validator = validator;
        }

        public async Task<AuthResponse> ExecuteAsync(AuthRequest request)
        {
            try
            {
                var validation = await _validator.ValidateAsync(request);
                if (!validation.IsValid)
                    return new AuthResponse
                    {
                        Success = false,
                        Errors = validation.Errors.Select(e => e.ErrorMessage)
                    };

                var existingUser = await _userRepository.FindByEmailAsync(request.Email);
                if (existingUser is not null)
                    return new AuthResponse
                    {
                        Success = false,
                        Errors = [ErrorCodes.EmailAlreadyRegistered]
                    };

                var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
                var user = new User(request.Name, request.Email, passwordHash, request.Role);

                await _userRepository.SaveAsync(user);

                var accessToken = _tokenService.GenerateAccessToken(user);
                var refreshTokenValue = _tokenService.GenerateRefreshToken();
                var refreshToken = new RefreshToken(user.Id, refreshTokenValue, DateTime.UtcNow.AddDays(7));

                await _refreshTokenRepository.SaveAsync(refreshToken);

                return new AuthResponse
                {
                    Success = true,
                    AccessToken = accessToken,
                    RefreshToken = refreshTokenValue,
                    UserId = user.Id,
                    Name = user.Name,
                    Role = user.Role,
                    Message = "User registered successfully."
                };
            }
            catch (Exception ex)
            {
                var messages = new List<string>();
                var current = ex;
                while (current is not null)
                {
                    messages.Add(current.Message);
                    current = current.InnerException;
                }

                return new AuthResponse
                {
                    Success = false,
                    Errors = messages
                };
            }
        }
    }
}
