namespace NutriHubPatient.Application.UseCases.GetMealItems
{
    public class GetMealItemsInput
    {
        public Guid PatientId { get; set; }
        public Guid MealId { get; set; }
    }
}
