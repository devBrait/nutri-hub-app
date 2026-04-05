using FluentValidation;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.Repositories;

namespace NutriHubAuth.API.UseCases
{
    public class AuthUseCase : IAuthUseCase<AuthRequest, AuthResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IValidator<AuthRequest> _validator;

        public AuthUseCase(IUserRepository userRepository, IValidator<AuthRequest> validator)
        {
            _userRepository = userRepository;
            _validator = validator;
        }

        public async Task<AuthResponse> ExecuteAsync(AuthRequest request)
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
                    Errors = ["Email already registered."]
                };

            var user = new User(request.Name, request.Email, request.Document, request.Password, request.Role);

            await _userRepository.SaveAsync(user);

            return new AuthResponse
            {
                Success = true,
                Message = "User registered successfully.",
            };
        }
    }
}
