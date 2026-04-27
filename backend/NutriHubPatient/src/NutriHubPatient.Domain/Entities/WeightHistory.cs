namespace NutriHubPatient.Domain.Entities
{
    public class WeightHistory
    {
        public Guid Id { get; private set; }
        public Guid PatientId { get; private set; }
        public decimal WeightKg { get; private set; }
        public DateOnly RecordedAt { get; private set; }
        public string? Notes { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected WeightHistory() { }

        public WeightHistory(Guid patientId, decimal weightKg, DateOnly? recordedAt = null, string? notes = null)
        {
            Id = Guid.NewGuid();
            PatientId = patientId;
            WeightKg = weightKg;
            RecordedAt = recordedAt ?? DateOnly.FromDateTime(DateTime.UtcNow);
            Notes = notes;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
