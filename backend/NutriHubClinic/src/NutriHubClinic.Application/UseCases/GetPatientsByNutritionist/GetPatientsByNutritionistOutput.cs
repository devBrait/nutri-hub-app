namespace NutriHubClinic.Application.UseCases.GetPatientsByNutritionist
{
    public class GetPatientsByNutritionistOutput
    {
        public IEnumerable<PatientOutput> Patients { get; set; } = [];
    }

    public class PatientOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
