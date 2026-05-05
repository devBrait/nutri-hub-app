using NutriHubClinic.Domain.Enums;

namespace NutriHubClinic.Application.UseCases.GetMyInvitations
{
    public class GetMyInvitationsOutput
    {
        public IEnumerable<InvitationItem> Invitations { get; set; } = [];
    }

    public class InvitationItem
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string Token { get; set; } = null!;
        public InvitationStatus Status { get; set; }
        public DateTime ExpirationDate { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
