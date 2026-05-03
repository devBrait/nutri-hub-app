using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.UseCases.GetDailySummary
{
    public class GetDailySummaryOutput
    {
        public DateOnly Date { get; set; }
        public int WaterMl { get; set; }
        public int WaterGoalMl { get; set; }
        public decimal CaloriesConsumed { get; set; }
        public int CaloriesGoal { get; set; }
        public int ProgressPercent { get; set; }
        public decimal CarbsG { get; set; }
        public decimal ProteinG { get; set; }
        public decimal FatG { get; set; }
        public decimal CarbsGoalG { get; set; }
        public decimal ProteinGoalG { get; set; }
        public decimal FatGoalG { get; set; }
        public IEnumerable<MealSummaryOutput> Meals { get; set; } = [];
    }

    public class MealSummaryOutput
    {
        public Guid Id { get; set; }
        public MealType MealType { get; set; }
        public decimal CaloriesConsumed { get; set; }
        public decimal CarbsG { get; set; }
        public decimal ProteinG { get; set; }
        public decimal FatG { get; set; }
    }
}
