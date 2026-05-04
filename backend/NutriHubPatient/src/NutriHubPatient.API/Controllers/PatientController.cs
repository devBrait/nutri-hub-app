using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.API.Helpers;
using NutriHubPatient.Application.UseCases.CreatePatient;
using NutriHubPatient.Application.UseCases.GetDailySummary;
using NutriHubPatient.Application.UseCases.GetPatientProfile;
using NutriHubPatient.Application.UseCases.LogWeight;
using NutriHubPatient.Application.UseCases.SaveOnboarding;
using NutriHubPatient.Application.UseCases.UpdatePatientProfile;
using System.Security.Claims;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ICreatePatientUseCase _createPatientUseCase;
        private readonly ISaveOnboardingUseCase _saveOnboardingUseCase;
        private readonly IGetDailySummaryUseCase _getDailySummaryUseCase;
        private readonly IGetPatientProfileUseCase _getPatientProfileUseCase;
        private readonly IUpdatePatientProfileUseCase _updatePatientProfileUseCase;
        private readonly ILogWeightUseCase _logWeightUseCase;

        public PatientController(
            ICreatePatientUseCase createPatientUseCase,
            ISaveOnboardingUseCase saveOnboardingUseCase,
            IGetDailySummaryUseCase getDailySummaryUseCase,
            IGetPatientProfileUseCase getPatientProfileUseCase,
            IUpdatePatientProfileUseCase updatePatientProfileUseCase,
            ILogWeightUseCase logWeightUseCase)
        {
            _createPatientUseCase = createPatientUseCase;
            _saveOnboardingUseCase = saveOnboardingUseCase;
            _getDailySummaryUseCase = getDailySummaryUseCase;
            _getPatientProfileUseCase = getPatientProfileUseCase;
            _updatePatientProfileUseCase = updatePatientProfileUseCase;
            _logWeightUseCase = logWeightUseCase;
        }

        [HttpPost]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(CreatePatientOutput), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreatePatient()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                        ?? User.FindFirstValue("sub");
            var name = User.FindFirstValue(ClaimTypes.Name)
                       ?? User.FindFirstValue("name");
            var email = User.FindFirstValue(ClaimTypes.Email)
                        ?? User.FindFirstValue("email");

            if (!Guid.TryParse(userId, out var id))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new CreatePatientInput { Id = id, Name = name!, Email = email! };
            var result = await _createPatientUseCase.ExecuteAsync(input);

            if (result.Success)
                return StatusCode(StatusCodes.Status201Created, new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPost("onboarding")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(SaveOnboardingOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SaveOnboarding([FromBody] SaveOnboardingInput input)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");

            if (!Guid.TryParse(userId, out var id))
                return Unauthorized(new { success = false, message = "Invalid token." });

            input.PatientId = id;
            var result = await _saveOnboardingUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("daily-summary")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(GetDailySummaryOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetDailySummary([FromQuery] string? date)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");

            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var parsedDate = date is not null && DateOnly.TryParseExact(date, "yyyy-MM-dd", out var d)
                ? d
                : DateOnly.FromDateTime(DateTime.UtcNow);

            var input = new GetDailySummaryInput { PatientId = patientId, Date = parsedDate };
            var result = await _getDailySummaryUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("profile")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(GetPatientProfileOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var result = await _getPatientProfileUseCase.ExecuteAsync(new GetPatientProfileInput { PatientId = patientId });
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPut("profile")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(GetPatientProfileOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdatePatientProfileInput input)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            input.PatientId = patientId;
            var result = await _updatePatientProfileUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPost("weight")]
        [Authorize(Roles = "Patient")]
        [ProducesResponseType(typeof(LogWeightOutput), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> LogWeight([FromBody] LogWeightInput input)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            input.PatientId = patientId;
            var result = await _logWeightUseCase.ExecuteAsync(input);

            if (result.Success)
                return StatusCode(StatusCodes.Status201Created, new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return HttpResponseHelper.FromValidationResult(result);
        }

    }
}
