using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.Application.DTOs;
using NutriHubPatient.Application.Services;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/foods")]
    [ApiController]
    [Authorize]
    public class FoodController : ControllerBase
    {
        private readonly IFoodService _foodService;

        public FoodController(IFoodService foodService)
        {
            _foodService = foodService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(FoodPageResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Search(
            [FromQuery] string? query,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var result = await _foodService.GetFoodsAsync(query, page, pageSize);
            return Ok(new { success = true, output = result });
        }
    }
}
