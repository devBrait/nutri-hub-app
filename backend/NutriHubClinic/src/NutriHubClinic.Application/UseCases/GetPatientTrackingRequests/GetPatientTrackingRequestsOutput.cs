namespace NutriHubClinic.Application.UseCases.GetPatientTrackingRequests
{
    public class GetPatientTrackingRequestsOutput
    {
        public IEnumerable<PatientTrackingRequestItem> Requests { get; set; } = [];
    }

    public class PatientTrackingRequestItem
    {
        public Guid Id { get; set; }
        public Guid NutritionistId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
