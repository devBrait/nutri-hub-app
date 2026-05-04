namespace NutriHubPatient.Application.UseCases.DeleteMealItem
{
    public class DeleteMealItemInput
    {
        public Guid PatientId { get; set; }
        public Guid MealId { get; set; }
        public Guid MealItemId { get; set; }
    }
}
