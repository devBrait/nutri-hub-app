using Microsoft.AspNetCore.Mvc;
using NutriHubPatient.Domain.Common;
using System.Diagnostics.CodeAnalysis;

namespace NutriHubPatient.API.Helpers
{
    [ExcludeFromCodeCoverage]
    public static class HttpResponseHelper
    {
        public static IActionResult FromValidationResult<T>(Result<T> result) where T : class
        {
            if (result.Success)
                return new OkObjectResult(new
                {
                    success = true,
                    message = result.Message,
                    output = result.Output
                });

            return GetErrorResult(result);
        }

        private static IActionResult GetErrorResult<T>(Result<T> result) where T : class
        {
            return result.ErrorType switch
            {
                ErrorType.Validation => new ObjectResult(new
                {
                    success = false,
                    message = result.Message
                })
                { StatusCode = StatusCodes.Status422UnprocessableEntity },

                ErrorType.NotFound => new NotFoundObjectResult(new
                {
                    success = false,
                    message = result.Message
                }),

                ErrorType.Conflict => new ObjectResult(new
                {
                    success = false,
                    message = result.Message
                })
                { StatusCode = StatusCodes.Status409Conflict },

                ErrorType.InternalError => new ObjectResult(new
                {
                    success = false,
                    message = result.Message
                })
                { StatusCode = StatusCodes.Status500InternalServerError },

                _ => new ObjectResult(new
                {
                    success = false,
                    message = result.Message
                })
                { StatusCode = StatusCodes.Status500InternalServerError }
            };
        }
    }
}
