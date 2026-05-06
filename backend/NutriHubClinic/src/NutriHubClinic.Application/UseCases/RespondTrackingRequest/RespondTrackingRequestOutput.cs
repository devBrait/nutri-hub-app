namespace NutriHubClinic.Application.UseCases.RespondTrackingRequest
{
    public class RespondTrackingRequestOutput
    {
        public Guid PatientId { get; set; }
        public string PatientName { get; set; } = string.Empty;
    }
}
