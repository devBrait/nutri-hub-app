namespace NutriHubPatient.Application.UseCases.CreatePatient
{
    public class CreatePatientInput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
    }
}
