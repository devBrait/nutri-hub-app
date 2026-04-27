using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.UseCases;
using System.Security.Claims;

namespace NutriHubAuth.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthUseCase<AuthRequest, AuthResponse> _authUseCase;
        private readonly ILoginUseCase _loginUseCase;
        private readonly ILogoutUseCase _logoutUseCase;

        public AuthController(
            IAuthUseCase<AuthRequest, AuthResponse> authUseCase,
            ILoginUseCase loginUseCase,
            ILogoutUseCase logoutUseCase)
        {
            _authUseCase = authUseCase;
            _loginUseCase = loginUseCase;
            _logoutUseCase = logoutUseCase;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Register([FromBody] AuthRequest request)
        {
            var response = await _authUseCase.ExecuteAsync(request);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _loginUseCase.ExecuteAsync(request);

            if (!response.Success)
                return Unauthorized(response);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Logout()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? User.FindFirstValue("sub");

            if (userIdClaim is null || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            await _logoutUseCase.ExecuteAsync(userId);

            return NoContent();
        }
    }
}
