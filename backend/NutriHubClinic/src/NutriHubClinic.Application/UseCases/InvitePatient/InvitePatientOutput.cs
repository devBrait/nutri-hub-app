namespace NutriHubClinic.Application.UseCases.InvitePatient
{
    public class InvitePatientOutput
    {
        public Guid InvitationId { get; set; }
        public string Email { get; set; } = null!;
        public string InviteLink { get; set; } = null!;
        public DateTime ExpirationDate { get; set; }
    }
}
