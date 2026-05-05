using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.API.Helpers;
using NutriHubClinic.Application.UseCases.CreateNutritionist;
using NutriHubClinic.Application.UseCases.GetMyInvitations;
using NutriHubClinic.Application.UseCases.GetMyPatients;
using NutriHubClinic.Application.UseCases.GetNutritionists;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.UseCases.InvitePatient;
using NutriHubClinic.Application.UseCases.UpdateNutritionistProfile;
using System.Security.Claims;

namespace NutriHubClinic.API.Controllers
{
    [Route("api/nutritionists")]
    [ApiController]
    public class NutritionistController : ControllerBase
    {
        private readonly ICreateNutritionistUseCase _createNutritionistUseCase;
        private readonly IGetPatientsByNutritionistUseCase _getPatientsByNutritionistUseCase;
        private readonly IGetNutritionistsUseCase _getNutritionistsUseCase;
        private readonly IGetMyPatientsUseCase _getMyPatientsUseCase;
        private readonly IGetMyInvitationsUseCase _getMyInvitationsUseCase;
        private readonly IInvitePatientUseCase _invitePatientUseCase;
        private readonly IUpdateNutritionistProfileUseCase _updateNutritionistProfileUseCase;

        public NutritionistController(
            ICreateNutritionistUseCase createNutritionistUseCase,
            IGetPatientsByNutritionistUseCase getPatientsByNutritionistUseCase,
            IGetNutritionistsUseCase getNutritionistsUseCase,
            IGetMyPatientsUseCase getMyPatientsUseCase,
            IGetMyInvitationsUseCase getMyInvitationsUseCase,
            IInvitePatientUseCase invitePatientUseCase,
            IUpdateNutritionistProfileUseCase updateNutritionistProfileUseCase)
        {
            _createNutritionistUseCase = createNutritionistUseCase;
            _getPatientsByNutritionistUseCase = getPatientsByNutritionistUseCase;
            _getNutritionistsUseCase = getNutritionistsUseCase;
            _getMyPatientsUseCase = getMyPatientsUseCase;
            _getMyInvitationsUseCase = getMyInvitationsUseCase;
            _invitePatientUseCase = invitePatientUseCase;
            _updateNutritionistProfileUseCase = updateNutritionistProfileUseCase;
        }

        [HttpPost]
        [Authorize(Roles = "Nutritionist")]
        [ProducesResponseType(typeof(CreateNutritionistOutput), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateNutritionist()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            var name = User.FindFirstValue(ClaimTypes.Name) ?? User.FindFirstValue("name");
            var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue("email");

            if (!Guid.TryParse(userId, out var id))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new CreateNutritionistInput { Id = id, Name = name!, Email = email! };
            var result = await _createNutritionistUseCase.ExecuteAsync(input);

            if (result.Success)
                return StatusCode(StatusCodes.Status201Created, new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(GetNutritionistsOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetNutritionists()
        {
            var result = await _getNutritionistsUseCase.ExecuteAsync();
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("{id}/patients")]
        [ProducesResponseType(typeof(GetPatientsByNutritionistOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPatients([FromRoute] Guid id)
        {
            var input = new GetPatientsByNutritionistInput { Id = id };
            var result = await _getPatientsByNutritionistUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("me/patients")]
        [Authorize(Roles = "Nutritionist")]
        [ProducesResponseType(typeof(GetMyPatientsOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetMyPatients()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var nutritionistId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var result = await _getMyPatientsUseCase.ExecuteAsync(nutritionistId);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("me/invitations")]
        [Authorize(Roles = "Nutritionist")]
        [ProducesResponseType(typeof(GetMyInvitationsOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetMyInvitations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var nutritionistId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var result = await _getMyInvitationsUseCase.ExecuteAsync(nutritionistId);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPost("me/invitations")]
        [Authorize(Roles = "Nutritionist")]
        [ProducesResponseType(typeof(InvitePatientOutput), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> InvitePatient([FromBody] InvitePatientRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var nutritionistId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new InvitePatientInput
            {
                NutritionistId = nutritionistId,
                Email = request.Email,
                FrontendBaseUrl = request.FrontendBaseUrl
            };

            var result = await _invitePatientUseCase.ExecuteAsync(input);

            if (result.Success)
                return StatusCode(StatusCodes.Status201Created, new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPut("me/profile")]
        [Authorize(Roles = "Nutritionist")]
        [ProducesResponseType(typeof(UpdateNutritionistProfileOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateNutritionistProfileInput input)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var nutritionistId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            input.NutritionistId = nutritionistId;
            var result = await _updateNutritionistProfileUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }
    }

    public record InvitePatientRequest(string Email, string FrontendBaseUrl);
}
