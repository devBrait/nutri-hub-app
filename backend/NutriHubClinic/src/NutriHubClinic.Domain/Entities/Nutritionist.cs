namespace NutriHubClinic.Domain.Entities
{
    public class Nutritionist
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected Nutritionist()
        {
            Name = null!;
            Email = null!;
        }

        public Nutritionist(Guid id, string name, string email)
        {
            Id = id;
            Name = name;
            Email = email;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
