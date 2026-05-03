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
        public bool OnboardingCompleted { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        protected Patient()
        {
            Name = null!;
            Email = null!;
        }

        public Patient(Guid id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
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

        public void SaveOnboarding(Sex sex, int ageYears, decimal heightCm)
        {
            Sex = sex;
            DateOfBirth = DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-ageYears));
            HeightCm = heightCm;
            OnboardingCompleted = true;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
