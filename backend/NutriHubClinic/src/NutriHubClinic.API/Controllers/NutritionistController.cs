using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.API.Helpers;
using NutriHubClinic.Application.UseCases.CreateNutritionist;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using System.Security.Claims;

namespace NutriHubClinic.API.Controllers
{
    [Route("api/nutritionists")]
    [ApiController]
    public class NutritionistController : ControllerBase
    {
        private readonly ICreateNutritionistUseCase _createNutritionistUseCase;
        private readonly IGetPatientsByNutritionistUseCase _getPatientsByNutritionistUseCase;

        public NutritionistController(
            ICreateNutritionistUseCase createNutritionistUseCase,
            IGetPatientsByNutritionistUseCase getPatientsByNutritionistUseCase)
        {
            _createNutritionistUseCase = createNutritionistUseCase;
            _getPatientsByNutritionistUseCase = getPatientsByNutritionistUseCase;
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");
            var name = User.FindFirstValue(ClaimTypes.Name)
                       ?? User.FindFirstValue("name");
            var email = User.FindFirstValue(ClaimTypes.Email)
                        ?? User.FindFirstValue("email");

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
    }
}
