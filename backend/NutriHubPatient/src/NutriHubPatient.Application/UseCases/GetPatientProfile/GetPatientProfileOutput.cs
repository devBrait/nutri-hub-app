using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.UseCases.GetPatientProfile
{
    public class GetPatientProfileOutput
    {
        public Guid PatientId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Sex? Sex { get; set; }
        public int? AgeYears { get; set; }
        public decimal? HeightCm { get; set; }
        public Objective? Objective { get; set; }
        public ActivityLevel? ActivityLevel { get; set; }
        public decimal? TargetWeightKg { get; set; }
        public int? DailyCalorieGoal { get; set; }
        public decimal? CurrentWeightKg { get; set; }
        public decimal? InitialWeightKg { get; set; }
        public IEnumerable<WeightEntryOutput> WeightHistory { get; set; } = [];
    }

    public class WeightEntryOutput
    {
        public Guid Id { get; set; }
        public decimal WeightKg { get; set; }
        public DateOnly RecordedAt { get; set; }
    }
}
