using Microsoft.AspNetCore.Mvc;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.UseCases;

namespace NutriHubAuth.API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthUseCase<AuthRequest, AuthResponse> _authUseCase;

        public AuthController(IAuthUseCase<AuthRequest, AuthResponse> authUseCase)
        {
            _authUseCase = authUseCase;
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
    }
}
