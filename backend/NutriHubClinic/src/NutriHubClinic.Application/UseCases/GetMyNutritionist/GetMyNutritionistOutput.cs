namespace NutriHubClinic.Application.UseCases.GetMyNutritionist
{
    public class GetMyNutritionistOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime LinkedAt { get; set; }
    }
}
