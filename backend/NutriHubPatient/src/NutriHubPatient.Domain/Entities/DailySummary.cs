namespace NutriHubPatient.Domain.Entities
{
    public class DailySummary
    {
        public Guid Id { get; private set; }
        public Guid PatientId { get; private set; }
        public DateOnly Date { get; private set; }
        public int WaterMl { get; private set; }
        public decimal TotalCalories { get; private set; }
        public int CalorieGoal { get; private set; }
        public decimal TotalCarbsG { get; private set; }
        public decimal TotalProteinG { get; private set; }
        public decimal TotalFatG { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        public ICollection<Meal> Meals { get; private set; } = [];

        protected DailySummary() { }

        public DailySummary(Guid patientId, DateOnly date, int calorieGoal)
        {
            Id = Guid.NewGuid();
            PatientId = patientId;
            Date = date;
            CalorieGoal = calorieGoal;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void AddWater(int ml)
        {
            WaterMl += ml;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateTotals(decimal calories, decimal carbsG, decimal proteinG, decimal fatG)
        {
            TotalCalories += calories;
            TotalCarbsG += carbsG;
            TotalProteinG += proteinG;
            TotalFatG += fatG;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
