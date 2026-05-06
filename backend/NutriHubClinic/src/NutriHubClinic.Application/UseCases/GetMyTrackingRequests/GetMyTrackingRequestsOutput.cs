namespace NutriHubClinic.Application.UseCases.GetMyTrackingRequests
{
    public class GetMyTrackingRequestsOutput
    {
        public IEnumerable<TrackingRequestItem> Requests { get; set; } = [];
    }

    public class TrackingRequestItem
    {
        public Guid Id { get; set; }
        public Guid PatientId { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string PatientEmail { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
