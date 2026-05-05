namespace NutriHubClinic.Application.UseCases.AcceptInvitation
{
    public class AcceptInvitationInput
    {
        public string Token { get; set; } = null!;
        public Guid PatientId { get; set; }
        public string PatientName { get; set; } = null!;
        public string PatientEmail { get; set; } = null!;
    }
}
