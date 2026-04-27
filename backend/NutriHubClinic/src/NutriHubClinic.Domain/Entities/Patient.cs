namespace NutriHubClinic.Domain.Entities
{
    public class Patient
    {
        public Guid Id { get; private set; }
        public Guid NutritionistId { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public Nutritionist Nutritionist { get; private set; } = null!;

        protected Patient() { }

        public Patient(Guid id, Guid nutritionistId)
        {
            Id = id;
            NutritionistId = nutritionistId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
