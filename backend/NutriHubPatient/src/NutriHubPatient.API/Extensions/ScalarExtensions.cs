using Scalar.AspNetCore;

namespace NutriHubPatient.API.Extensions
{
    public static class ScalarExtensions
    {
        public static IEndpointRouteBuilder MapScalar(this IEndpointRouteBuilder app)
        {
            app.MapScalarApiReference("/doc/scalar", options =>
            {
                options.Title = "NutriHub Patient API";
                options.Theme = ScalarTheme.BluePlanet;
                options.ForceThemeMode = ThemeMode.Dark;
                options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
                options.Authentication = new ScalarAuthenticationOptions
                {
                    PreferredSecuritySchemes = ["Bearer"]
                };
            });

            return app;
        }
    }
}
