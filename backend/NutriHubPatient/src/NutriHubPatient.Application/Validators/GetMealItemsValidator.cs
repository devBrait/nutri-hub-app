using FluentValidation;
using NutriHubPatient.Application.UseCases.GetMealItems;

namespace NutriHubPatient.Application.Validators
{
    public class GetMealItemsValidator : AbstractValidator<GetMealItemsInput>
    {
        public GetMealItemsValidator()
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.MealId)
                .NotEmpty().WithMessage("Meal ID is required.");
        }
    }
}
