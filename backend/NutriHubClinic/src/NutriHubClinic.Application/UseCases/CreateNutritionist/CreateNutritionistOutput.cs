namespace NutriHubClinic.Application.UseCases.CreateNutritionist
{
    public class CreateNutritionistOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
