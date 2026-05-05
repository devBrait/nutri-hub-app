namespace NutriHubPatient.Application.UseCases.GetFoods
{
    public class GetFoodsOutput
    {
        public List<FoodOutput> Items { get; set; } = [];
        public int TotalCount { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }

    public class FoodOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public double CaloriesPer100g { get; set; }
        public FoodMacrosOutput MacrosPer100g { get; set; } = null!;
    }

    public class FoodMacrosOutput
    {
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public double Fat { get; set; }
    }
}
