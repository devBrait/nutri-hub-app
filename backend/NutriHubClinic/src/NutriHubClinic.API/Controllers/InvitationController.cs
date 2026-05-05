using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.API.Helpers;
using NutriHubClinic.Application.UseCases.AcceptInvitation;
using System.Security.Claims;

namespace NutriHubClinic.API.Controllers
{
    [Route("api/invitations")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly IAcceptInvitationUseCase _acceptInvitationUseCase;

        public InvitationController(IAcceptInvitationUseCase acceptInvitationUseCase)
        {
            _acceptInvitationUseCase = acceptInvitationUseCase;
        }

        [HttpPost("{token}/accept")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(AcceptInvitationOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AcceptInvitation([FromRoute] string token)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            var name = User.FindFirstValue(ClaimTypes.Name) ?? User.FindFirstValue("name") ?? "";
            var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue("email") ?? "";

            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new AcceptInvitationInput
            {
                Token = token,
                PatientId = patientId,
                PatientName = name,
                PatientEmail = email
            };

            var result = await _acceptInvitationUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }
    }
}
