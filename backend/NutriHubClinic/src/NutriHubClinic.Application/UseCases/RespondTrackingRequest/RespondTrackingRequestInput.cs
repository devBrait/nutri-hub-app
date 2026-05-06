namespace NutriHubClinic.Application.UseCases.RespondTrackingRequest
{
    public class RespondTrackingRequestInput
    {
        public Guid RequestId { get; set; }
        public Guid NutritionistId { get; set; }
        public bool Accept { get; set; }
    }
}
