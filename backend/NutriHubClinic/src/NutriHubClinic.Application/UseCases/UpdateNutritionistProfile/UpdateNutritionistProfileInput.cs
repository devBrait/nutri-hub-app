namespace NutriHubClinic.Application.UseCases.UpdateNutritionistProfile
{
    public class UpdateNutritionistProfileInput
    {
        public Guid NutritionistId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Crn { get; set; }
    }
}
