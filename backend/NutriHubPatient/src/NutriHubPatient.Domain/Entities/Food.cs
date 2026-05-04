namespace NutriHubPatient.Domain.Entities
{
    public class Food
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public double CaloriesPer100g { get; private set; }
        public double CarbsPer100g { get; private set; }
        public double ProteinPer100g { get; private set; }
        public double FatPer100g { get; private set; }
        public bool IsCustom { get; private set; }
        public Guid? CreatedByPatientId { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected Food() { Name = null!; }

        // Construtor para seed de dados (id explícito)
        public Food(Guid id, string name, double caloriesPer100g, double carbsPer100g, double proteinPer100g, double fatPer100g)
        {
            Id = id;
            Name = name;
            CaloriesPer100g = caloriesPer100g;
            CarbsPer100g = carbsPer100g;
            ProteinPer100g = proteinPer100g;
            FatPer100g = fatPer100g;
            IsCustom = false;
            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        }

        // Construtor para alimentos customizados criados pelo paciente
        public Food(string name, double caloriesPer100g, double carbsPer100g, double proteinPer100g, double fatPer100g, Guid createdByPatientId)
        {
            Id = Guid.NewGuid();
            Name = name;
            CaloriesPer100g = caloriesPer100g;
            CarbsPer100g = carbsPer100g;
            ProteinPer100g = proteinPer100g;
            FatPer100g = fatPer100g;
            IsCustom = true;
            CreatedByPatientId = createdByPatientId;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
