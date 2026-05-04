namespace NutriHubPatient.Application.UseCases.LogWeight
{
    public class LogWeightOutput
    {
        public Guid Id { get; set; }
        public decimal WeightKg { get; set; }
        public DateOnly RecordedAt { get; set; }
    }
}
