using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.API.Helpers;
using NutriHubClinic.Application.UseCases.GetMyNutritionist;
using NutriHubClinic.Application.UseCases.RequestTracking;
using NutriHubClinic.Application.UseCases.UnlinkNutritionist;
using System.Security.Claims;

namespace NutriHubClinic.API.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IGetMyNutritionistUseCase _getMyNutritionistUseCase;
        private readonly IUnlinkNutritionistUseCase _unlinkNutritionistUseCase;
        private readonly IRequestTrackingUseCase _requestTrackingUseCase;

        public PatientController(
            IGetMyNutritionistUseCase getMyNutritionistUseCase,
            IUnlinkNutritionistUseCase unlinkNutritionistUseCase,
            IRequestTrackingUseCase requestTrackingUseCase)
        {
            _getMyNutritionistUseCase = getMyNutritionistUseCase;
            _unlinkNutritionistUseCase = unlinkNutritionistUseCase;
            _requestTrackingUseCase = requestTrackingUseCase;
        }

        [HttpGet("me/nutritionist")]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetMyNutritionist()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var result = await _getMyNutritionistUseCase.ExecuteAsync(patientId);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpDelete("me/nutritionist")]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> UnlinkNutritionist()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var result = await _unlinkNutritionistUseCase.ExecuteAsync(patientId);
            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpPost("me/nutritionist/{nutritionistId}")]
        [Authorize(Roles = "Patient")]
        public async Task<IActionResult> RequestTracking([FromRoute] Guid nutritionistId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub");
            var name = User.FindFirstValue(ClaimTypes.Name) ?? User.FindFirstValue("name");
            var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue("email");

            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new RequestTrackingInput
            {
                PatientId = patientId,
                NutritionistId = nutritionistId,
                PatientName = name!,
                PatientEmail = email!
            };

            var result = await _requestTrackingUseCase.ExecuteAsync(input);

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
