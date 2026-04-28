using Scalar.AspNetCore;

namespace NutriHubAuth.API.Extensions
{
    public static class ScalarExtensions
    {
        public static IEndpointRouteBuilder MapScalar(this IEndpointRouteBuilder app)
        {
            app.MapScalarApiReference("/doc/scalar",options =>
            {
                options.WithTitle("NutriHub Auth API");
                options.WithPreferredScheme("Bearer");
                options.WithHttpBearerAuthentication(bearer =>
                {
                    bearer.Token = string.Empty;
                });
                options.WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient);
                options.WithTheme(ScalarTheme.BluePlanet);
                options.WithForceThemeMode(ThemeMode.Dark);
            });

            return app;
        }
    }
}
