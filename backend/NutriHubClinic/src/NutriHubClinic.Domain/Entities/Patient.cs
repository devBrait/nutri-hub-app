namespace NutriHubClinic.Domain.Entities
{
    public class Patient
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public Guid NutritionistId { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Patient(string name, string email, Guid nutritionistId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            NutritionistId = nutritionistId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
