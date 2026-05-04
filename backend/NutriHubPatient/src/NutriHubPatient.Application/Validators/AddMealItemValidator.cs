using FluentValidation;
using NutriHubPatient.Application.UseCases.AddMealItem;

namespace NutriHubPatient.Application.Validators
{
    public class AddMealItemValidator : AbstractValidator<AddMealItemInput>
    {
        public AddMealItemValidator()
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.MealId)
                .NotEmpty().WithMessage("Meal ID is required.");

            RuleFor(x => x.FoodName)
                .NotEmpty().WithMessage("Food name is required.")
                .MaximumLength(200).WithMessage("Food name must be at most 200 characters.");

            RuleFor(x => x.QuantityG)
                .GreaterThan(0).WithMessage("Quantity must be greater than 0.")
                .LessThanOrEqualTo(5000).WithMessage("Quantity must be at most 5000g.");

            RuleFor(x => x.Calories)
                .GreaterThanOrEqualTo(0).WithMessage("Calories must be a non-negative value.");

            RuleFor(x => x.CarbsG)
                .GreaterThanOrEqualTo(0).WithMessage("Carbs must be a non-negative value.");

            RuleFor(x => x.ProteinG)
                .GreaterThanOrEqualTo(0).WithMessage("Protein must be a non-negative value.");

            RuleFor(x => x.FatG)
                .GreaterThanOrEqualTo(0).WithMessage("Fat must be a non-negative value.");
        }
    }
}
