using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.API.Helpers;
using NutriHubPatient.Application.UseCases.CreatePatient;
using NutriHubPatient.Application.UseCases.SaveOnboarding;
using NutriHubPatient.Application.UseCases.UpdatePatientAccount;
using System.Security.Claims;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ICreatePatientUseCase _createPatientUseCase;
        private readonly ISaveOnboardingUseCase _saveOnboardingUseCase;
        private readonly IUpdatePatientAccountUseCase _updatePatientAccountUseCase;

        public PatientController(
            ICreatePatientUseCase createPatientUseCase,
            ISaveOnboardingUseCase saveOnboardingUseCase,
            IUpdatePatientAccountUseCase updatePatientAccountUseCase)
        {
            _createPatientUseCase = createPatientUseCase;
            _saveOnboardingUseCase = saveOnboardingUseCase;
            _updatePatientAccountUseCase = updatePatientAccountUseCase;
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

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(UpdatePatientAccountOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateAccount([FromRoute] Guid id, [FromBody] UpdatePatientAccountInput input)
        {
            input.Id = id;
            var result = await _updatePatientAccountUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }
    }
}
