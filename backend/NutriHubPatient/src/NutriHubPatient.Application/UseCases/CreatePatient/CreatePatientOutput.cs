namespace NutriHubPatient.Application.UseCases.CreatePatient
{
    public class CreatePatientOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}
