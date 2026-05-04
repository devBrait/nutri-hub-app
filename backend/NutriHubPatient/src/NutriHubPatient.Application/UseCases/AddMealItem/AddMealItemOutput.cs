namespace NutriHubPatient.Application.UseCases.AddMealItem
{
    public class AddMealItemOutput
    {
        public Guid Id { get; set; }
        public string FoodName { get; set; } = null!;
        public decimal QuantityG { get; set; }
        public decimal Calories { get; set; }
        public decimal CarbsG { get; set; }
        public decimal ProteinG { get; set; }
        public decimal FatG { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
