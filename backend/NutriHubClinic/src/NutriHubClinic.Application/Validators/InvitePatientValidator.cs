using FluentValidation;
using NutriHubClinic.Application.UseCases.InvitePatient;

namespace NutriHubClinic.Application.Validators
{
    public class InvitePatientValidator : AbstractValidator<InvitePatientInput>
    {
        public InvitePatientValidator()
        {
            RuleFor(x => x.NutritionistId)
                .NotEmpty().WithMessage("Nutritionist ID is required.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.")
                .MaximumLength(255).WithMessage("Email must not exceed 255 characters.");

            RuleFor(x => x.FrontendBaseUrl)
                .NotEmpty().WithMessage("Frontend base URL is required.");
        }
    }
}
