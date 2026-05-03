using FluentValidation;
using NutriHubClinic.Application.UseCases.CreateNutritionist;

namespace NutriHubClinic.Application.Validators
{
    public class CreateNutritionistValidator : AbstractValidator<CreateNutritionistInput>
    {
        public CreateNutritionistValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Nutritionist ID is required.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");
        }
    }
}
