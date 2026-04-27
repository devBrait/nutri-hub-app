using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Domain.Entities
{
    public class Patient
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public Sex? Sex { get; private set; }
        public DateOnly? DateOfBirth { get; private set; }
        public string? Phone { get; private set; }
        public decimal? HeightCm { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        protected Patient()
        {
            Name = null!;
            Email = null!;
        }

        public Patient(string name, string email)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        public void UpdateAccount(string name, string email)
        {
            Name = name;
            Email = email;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
