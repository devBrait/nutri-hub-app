using FluentValidation;
using NutriHubPatient.Application.UseCases.CreatePatient;

namespace NutriHubPatient.Application.Validators
{
    public class CreatePatientValidator : AbstractValidator<CreatePatientInput>
    {
        public CreatePatientValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");
        }
    }
}
