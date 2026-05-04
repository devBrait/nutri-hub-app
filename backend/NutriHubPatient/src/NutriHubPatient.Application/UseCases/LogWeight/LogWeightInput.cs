namespace NutriHubPatient.Application.UseCases.LogWeight
{
    public class LogWeightInput
    {
        public Guid PatientId { get; set; }
        public decimal WeightKg { get; set; }
        public DateOnly? RecordedAt { get; set; }
        public string? Notes { get; set; }
    }
}
