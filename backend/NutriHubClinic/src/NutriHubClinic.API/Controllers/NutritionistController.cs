using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.API.Helpers;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;

namespace NutriHubClinic.API.Controllers
{
    [Route("api/nutritionists")]
    [ApiController]
    public class NutritionistController : ControllerBase
    {
        private readonly IGetPatientsByNutritionistUseCase _getPatientsByNutritionistUseCase;

        public NutritionistController(IGetPatientsByNutritionistUseCase getPatientsByNutritionistUseCase)
        {
            _getPatientsByNutritionistUseCase = getPatientsByNutritionistUseCase;
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
