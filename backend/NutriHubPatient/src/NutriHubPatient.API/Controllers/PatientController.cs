using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.API.Helpers;
using NutriHubPatient.Application.UseCases.UpdatePatientAccount;

namespace NutriHubPatient.API.Controllers
{
    [Route("api/patients")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IUpdatePatientAccountUseCase _updatePatientAccountUseCase;

        public PatientController(IUpdatePatientAccountUseCase updatePatientAccountUseCase)
        {
            _updatePatientAccountUseCase = updatePatientAccountUseCase;
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
