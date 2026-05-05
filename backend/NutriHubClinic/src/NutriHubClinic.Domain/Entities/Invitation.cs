using NutriHubClinic.Domain.Enums;

namespace NutriHubClinic.Domain.Entities
{
    public class Invitation
    {
        public Guid Id { get; private set; }
        public string Email { get; private set; }
        public string Token { get; private set; }
        public Guid NutritionistId { get; private set; }
        public DateTime ExpirationDate { get; private set; }
        public InvitationStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Nutritionist Nutritionist { get; private set; } = null!;

        protected Invitation() { Email = null!; Token = null!; }

        public Invitation(string email, Guid nutritionistId, int expirationDays = 7)
        {
            Id = Guid.NewGuid();
            Email = email.Trim().ToLower();
            Token = Convert.ToBase64String(Guid.NewGuid().ToByteArray())
                .Replace("+", "-").Replace("/", "_").TrimEnd('=');
            NutritionistId = nutritionistId;
            ExpirationDate = DateTime.UtcNow.AddDays(expirationDays);
            Status = InvitationStatus.Pending;
            CreatedAt = DateTime.UtcNow;
        }

        public bool IsExpired() => DateTime.UtcNow > ExpirationDate;

        public void Accept()
        {
            Status = InvitationStatus.Accepted;
        }

        public void MarkExpired()
        {
            Status = InvitationStatus.Expired;
        }
    }
}
