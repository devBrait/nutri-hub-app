namespace NutriHubClinic.Application.UseCases.InvitePatient
{
    public class InvitePatientInput
    {
        public Guid NutritionistId { get; set; }
        public string Email { get; set; } = null!;
        public string FrontendBaseUrl { get; set; } = null!;
    }
}
