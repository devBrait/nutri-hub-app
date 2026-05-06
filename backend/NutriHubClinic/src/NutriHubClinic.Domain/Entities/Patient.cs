namespace NutriHubClinic.Domain.Entities
{
    public class Patient
    {
        public Guid Id { get; private set; }
        public Guid NutritionistId { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Nutritionist Nutritionist { get; private set; } = null!;

        protected Patient() { Name = null!; Email = null!; }

        public Patient(Guid id, Guid nutritionistId, string name, string email)
        {
            Id = id;
            NutritionistId = nutritionistId;
            Name = name;
            Email = email.Trim().ToLower();
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateNutritionist(Guid newNutritionistId)
        {
            NutritionistId = newNutritionistId;
        }
    }
}
