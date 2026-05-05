namespace NutriHubClinic.Domain.Entities
{
    public class Nutritionist
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string? Crn { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected Nutritionist()
        {
            Name = null!;
            Email = null!;
        }

        public Nutritionist(Guid id, string name, string email, string? crn = null)
        {
            Id = id;
            Name = name;
            Email = email;
            Crn = crn;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateProfile(string name, string email, string? crn)
        {
            Name = name;
            Email = email;
            Crn = crn;
        }
    }
}
