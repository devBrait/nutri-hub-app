namespace NutriHubPatient.Application.DTOs
{
    public class FoodDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public double CaloriesPer100g { get; set; }
        public MacrosDto MacrosPer100g { get; set; } = null!;
    }

    public class MacrosDto
    {
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public double Fat { get; set; }
    }

    public class FoodPageResult
    {
        public List<FoodDto> Items { get; set; } = [];
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }
}
