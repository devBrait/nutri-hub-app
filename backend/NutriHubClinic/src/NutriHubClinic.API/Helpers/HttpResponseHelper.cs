using Microsoft.AspNetCore.Mvc;
using NutriHubClinic.Domain.Common;
using System.Diagnostics.CodeAnalysis;

namespace NutriHubClinic.API.Helpers
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
                ErrorType.Validation => new BadRequestObjectResult(new
                {
                    success = false,
                    message = result.Message
                }),

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

                ErrorType.Forbidden => new ObjectResult(new
                {
                    success = false,
                    message = result.Message
                })
                { StatusCode = StatusCodes.Status403Forbidden },

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
