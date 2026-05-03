namespace NutriHubPatient.Application.UseCases.GetDailySummary
{
    public class GetDailySummaryInput
    {
        public Guid PatientId { get; set; }
        public DateOnly Date { get; set; }
    }
}
