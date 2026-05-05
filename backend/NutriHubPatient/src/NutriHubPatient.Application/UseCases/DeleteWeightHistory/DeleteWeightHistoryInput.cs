namespace NutriHubPatient.Application.UseCases.DeleteWeightHistory
{
    public class DeleteWeightHistoryInput
    {
        public Guid WeightHistoryId { get; set; }
        public Guid PatientId { get; set; }
    }
}
