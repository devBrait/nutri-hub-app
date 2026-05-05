using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.API.Helpers;
using NutriHubPatient.Application.UseCases.GetFoods;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/foods")]
    [ApiController]
    [Authorize]
    public class FoodController : ControllerBase
    {
        private readonly IGetFoodsUseCase _getFoodsUseCase;

        public FoodController(IGetFoodsUseCase getFoodsUseCase)
        {
            _getFoodsUseCase = getFoodsUseCase;
        }

        [HttpGet]
        [ProducesResponseType(typeof(GetFoodsOutput), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Search(
            [FromQuery] string? query,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var input = new GetFoodsInput { Query = query, Page = page, PageSize = pageSize };
            var result = await _getFoodsUseCase.ExecuteAsync(input);
            return HttpResponseHelper.FromValidationResult(result);
        }
    }
}
