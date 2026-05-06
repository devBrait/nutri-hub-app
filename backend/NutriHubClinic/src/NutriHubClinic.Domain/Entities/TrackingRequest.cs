using NutriHubClinic.Domain.Enums;

namespace NutriHubClinic.Domain.Entities
{
    public class TrackingRequest
    {
        public Guid Id { get; private set; }
        public Guid PatientId { get; private set; }
        public string PatientName { get; private set; }
        public string PatientEmail { get; private set; }
        public Guid NutritionistId { get; private set; }
        public TrackingRequestStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Nutritionist Nutritionist { get; private set; } = null!;

        protected TrackingRequest() { PatientName = null!; PatientEmail = null!; }

        public TrackingRequest(Guid patientId, string patientName, string patientEmail, Guid nutritionistId)
        {
            Id = Guid.NewGuid();
            PatientId = patientId;
            PatientName = patientName;
            PatientEmail = patientEmail.Trim().ToLower();
            NutritionistId = nutritionistId;
            Status = TrackingRequestStatus.Pending;
            CreatedAt = DateTime.UtcNow;
        }

        public void Accept() => Status = TrackingRequestStatus.Accepted;
        public void Reject() => Status = TrackingRequestStatus.Rejected;
    }
}
