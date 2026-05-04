using FluentValidation;
using NutriHubPatient.Application.UseCases.DeleteMealItem;

namespace NutriHubPatient.Application.Validators
{
    public class DeleteMealItemValidator : AbstractValidator<DeleteMealItemInput>
    {
        public DeleteMealItemValidator()
        {
            RuleFor(x => x.PatientId).NotEmpty().WithMessage("Patient ID is required.");
            RuleFor(x => x.MealId).NotEmpty().WithMessage("Meal ID is required.");
            RuleFor(x => x.MealItemId).NotEmpty().WithMessage("Meal item ID is required.");
        }
    }
}
