namespace NutriHubClinic.Application.UseCases.GetNutritionistProfile
{
    public class GetNutritionistProfileOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Crn { get; set; }
    }
}
