using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.API.Helpers;
using NutriHubPatient.Application.UseCases.AddMealItem;
using NutriHubPatient.Application.UseCases.GetMealItems;
using System.Security.Claims;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/patients/meals")]
    [ApiController]
    [Authorize(Roles = "Patient")]
    public class MealController : ControllerBase
    {
        private readonly IAddMealItemUseCase _addMealItemUseCase;
        private readonly IGetMealItemsUseCase _getMealItemsUseCase;

        public MealController(
            IAddMealItemUseCase addMealItemUseCase,
            IGetMealItemsUseCase getMealItemsUseCase)
        {
            _addMealItemUseCase = addMealItemUseCase;
            _getMealItemsUseCase = getMealItemsUseCase;
        }

        [HttpPost("{mealId}/items")]
        [ProducesResponseType(typeof(AddMealItemOutput), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddItem([FromRoute] Guid mealId, [FromBody] AddMealItemInput input)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");

            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            input.PatientId = patientId;
            input.MealId = mealId;

            var result = await _addMealItemUseCase.ExecuteAsync(input);

            if (result.Success)
                return StatusCode(StatusCodes.Status201Created, new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return HttpResponseHelper.FromValidationResult(result);
        }

        [HttpGet("{mealId}/items")]
        [ProducesResponseType(typeof(GetMealItemsOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetItems([FromRoute] Guid mealId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? User.FindFirstValue("sub");

            if (!Guid.TryParse(userId, out var patientId))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var input = new GetMealItemsInput { PatientId = patientId, MealId = mealId };
            var result = await _getMealItemsUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }
    }
}
