using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.UseCases.SaveOnboarding
{
    public class SaveOnboardingOutput
    {
        public Guid PatientId { get; set; }
        public decimal HeightCm { get; set; }
        public decimal CurrentWeightKg { get; set; }
        public Objective Objective { get; set; }
        public decimal TargetWeightKg { get; set; }
        public ActivityLevel ActivityLevel { get; set; }
        public int DailyCalorieGoal { get; set; }
    }
}
