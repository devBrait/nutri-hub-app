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
        [ProducesResponseType(typeof(List<FoodDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Search([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest(new { success = false, message = "Query parameter is required." });

            var results = await _foodService.SearchFoodsAsync(query);

            return Ok(new { success = true, output = results });
        }
    }
}
