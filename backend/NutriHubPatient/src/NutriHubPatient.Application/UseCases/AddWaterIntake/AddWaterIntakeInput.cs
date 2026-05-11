namespace NutriHubPatient.Application.UseCases.AddWaterIntake
{
    public class AddWaterIntakeInput
    {
        public Guid PatientId { get; set; }
        public DateOnly Date { get; set; }
        public int AmountMl { get; set; }
    }
}
