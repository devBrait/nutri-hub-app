namespace NutriHubClinic.Application.UseCases.AcceptInvitation
{
    public class AcceptInvitationOutput
    {
        public Guid NutritionistId { get; set; }
        public string NutritionistName { get; set; } = null!;
    }
}
