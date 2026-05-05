using FluentValidation;
using NutriHubClinic.Application.UseCases.UpdateNutritionistProfile;

namespace NutriHubClinic.Application.Validators
{
    public class UpdateNutritionistProfileValidator : AbstractValidator<UpdateNutritionistProfileInput>
    {
        public UpdateNutritionistProfileValidator()
        {
            RuleFor(x => x.NutritionistId)
                .NotEmpty().WithMessage("Nutritionist ID is required.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 150).WithMessage("Name must be between 2 and 150 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.Crn)
                .MaximumLength(20).WithMessage("CRN must not exceed 20 characters.")
                .When(x => x.Crn is not null);
        }
    }
}
