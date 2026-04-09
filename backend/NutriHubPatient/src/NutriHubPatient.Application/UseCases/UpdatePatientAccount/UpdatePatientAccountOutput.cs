namespace NutriHubPatient.Application.UseCases.UpdatePatientAccount
{
    public class UpdatePatientAccountOutput
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; }
    }
}
