using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.UseCases.SaveOnboarding
{
    public class SaveOnboardingInput
    {
        public Guid PatientId { get; set; }
        public Sex Sex { get; set; }
        public int AgeYears { get; set; }
        public decimal HeightCm { get; set; }
        public decimal CurrentWeightKg { get; set; }
        public Objective Objective { get; set; }
        public decimal TargetWeightKg { get; set; }
        public ActivityLevel ActivityLevel { get; set; }
    }
}
