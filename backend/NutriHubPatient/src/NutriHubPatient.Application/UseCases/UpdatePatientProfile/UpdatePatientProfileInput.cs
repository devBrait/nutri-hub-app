using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.UseCases.UpdatePatientProfile
{
    public class UpdatePatientProfileInput
    {
        public Guid PatientId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Sex Sex { get; set; }
        public int AgeYears { get; set; }
        public decimal HeightCm { get; set; }
        public Objective Objective { get; set; }
        public ActivityLevel ActivityLevel { get; set; }
        public decimal TargetWeightKg { get; set; }
    }
}
