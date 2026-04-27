using Scalar.AspNetCore;

namespace NutriHubAuth.API.Extensions
{
    public static class ScalarExtensions
    {
        public static IEndpointRouteBuilder MapScalar(this IEndpointRouteBuilder app)
        {
            app.MapScalarApiReference(options =>
            {
                options.WithTitle("NutriHub Auth API");
                options.WithPreferredScheme("Bearer");
                options.WithHttpBearerAuthentication(bearer =>
                {
                    bearer.Token = string.Empty;
                });
            });

            return app;
        }
    }
}
