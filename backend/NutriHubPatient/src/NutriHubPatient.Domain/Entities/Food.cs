namespace NutriHubPatient.Domain.Entities
{
    public class Food
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public decimal CaloriesPer100g { get; private set; }
        public decimal CarbsPer100g { get; private set; }
        public decimal ProteinPer100g { get; private set; }
        public decimal FatPer100g { get; private set; }
        public bool IsCustom { get; private set; }
        public Guid? CreatedByPatientId { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected Food() { Name = null!; }

        public Food(string name, decimal caloriesPer100g, decimal carbsPer100g, decimal proteinPer100g, decimal fatPer100g, Guid? createdByPatientId = null)
        {
            Id = Guid.NewGuid();
            Name = name;
            CaloriesPer100g = caloriesPer100g;
            CarbsPer100g = carbsPer100g;
            ProteinPer100g = proteinPer100g;
            FatPer100g = fatPer100g;
            IsCustom = createdByPatientId.HasValue;
            CreatedByPatientId = createdByPatientId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
