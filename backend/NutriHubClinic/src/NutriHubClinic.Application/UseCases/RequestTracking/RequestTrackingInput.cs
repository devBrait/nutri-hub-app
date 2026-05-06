namespace NutriHubClinic.Application.UseCases.RequestTracking
{
    public class RequestTrackingInput
    {
        public Guid PatientId { get; set; }
        public Guid NutritionistId { get; set; }
        public string PatientName { get; set; } = string.Empty;
        public string PatientEmail { get; set; } = string.Empty;
    }
}
