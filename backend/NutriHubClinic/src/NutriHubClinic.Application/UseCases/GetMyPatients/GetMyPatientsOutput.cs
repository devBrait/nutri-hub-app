namespace NutriHubClinic.Application.UseCases.GetMyPatients
{
    public class GetMyPatientsOutput
    {
        public IEnumerable<PatientItem> Patients { get; set; } = [];
    }

    public class PatientItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime LinkedAt { get; set; }
    }
}
