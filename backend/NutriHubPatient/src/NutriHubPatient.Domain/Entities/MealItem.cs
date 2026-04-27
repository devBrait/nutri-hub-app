namespace NutriHubPatient.Domain.Entities
{
    public class MealItem
    {
        public Guid Id { get; private set; }
        public Guid MealId { get; private set; }
        public Guid? FoodId { get; private set; }
        public string FoodName { get; private set; }
        public decimal QuantityG { get; private set; }
        public decimal Calories { get; private set; }
        public decimal CarbsG { get; private set; }
        public decimal ProteinG { get; private set; }
        public decimal FatG { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected MealItem() { FoodName = null!; }

        public MealItem(Guid mealId, string foodName, decimal quantityG, decimal calories, decimal carbsG, decimal proteinG, decimal fatG, Guid? foodId = null)
        {
            Id = Guid.NewGuid();
            MealId = mealId;
            FoodId = foodId;
            FoodName = foodName;
            QuantityG = quantityG;
            Calories = calories;
            CarbsG = carbsG;
            ProteinG = proteinG;
            FatG = fatG;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
