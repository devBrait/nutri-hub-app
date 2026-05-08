using Scalar.AspNetCore;

namespace NutriHubAuth.API.Extensions
{
    public static class ScalarExtensions
    {
        public static IEndpointRouteBuilder MapScalar(this IEndpointRouteBuilder app)
        {
            app.MapScalarApiReference("/doc/scalar", options =>
            {
                options.Title = "NutriHub Auth API";
                options.Theme = ScalarTheme.BluePlanet;
                options.ForceThemeMode = ThemeMode.Dark;
                options.DefaultOpenAllTags = false;
                options.Authentication = new ScalarAuthenticationOptions
                {
                    PreferredSecuritySchemes = ["Bearer"]
                };
            });

            return app;
        }
    }
}
