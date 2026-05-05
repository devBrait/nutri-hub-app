namespace NutriHubClinic.Application.UseCases.UpdateNutritionistProfile
{
    public class UpdateNutritionistProfileOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Crn { get; set; }
    }
}
