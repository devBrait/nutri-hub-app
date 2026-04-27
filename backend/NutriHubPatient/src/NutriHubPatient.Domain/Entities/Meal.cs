using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Domain.Entities
{
    public class Meal
    {
        public Guid Id { get; private set; }
        public Guid DailySummaryId { get; private set; }
        public Guid PatientId { get; private set; }
        public MealType MealType { get; private set; }
        public string? CustomName { get; private set; }
        public TimeOnly? EatenAt { get; private set; }
        public decimal TotalCalories { get; private set; }
        public decimal TotalCarbsG { get; private set; }
        public decimal TotalProteinG { get; private set; }
        public decimal TotalFatG { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public ICollection<MealItem> Items { get; private set; } = [];

        protected Meal() { }

        public Meal(Guid dailySummaryId, Guid patientId, MealType mealType, string? customName = null, TimeOnly? eatenAt = null)
        {
            Id = Guid.NewGuid();
            DailySummaryId = dailySummaryId;
            PatientId = patientId;
            MealType = mealType;
            CustomName = customName;
            EatenAt = eatenAt;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateTotals(decimal calories, decimal carbsG, decimal proteinG, decimal fatG)
        {
            TotalCalories += calories;
            TotalCarbsG += carbsG;
            TotalProteinG += proteinG;
            TotalFatG += fatG;
        }
    }
}
