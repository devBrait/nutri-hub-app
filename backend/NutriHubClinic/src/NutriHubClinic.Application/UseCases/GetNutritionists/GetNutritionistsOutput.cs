namespace NutriHubClinic.Application.UseCases.GetNutritionists
{
    public class GetNutritionistsOutput
    {
        public IEnumerable<NutritionistItemDto> Items { get; set; } = [];
    }

    public class NutritionistItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
