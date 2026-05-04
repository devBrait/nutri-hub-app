using FluentValidation;
using NutriHubPatient.Application.UseCases.UpdatePatientProfile;

namespace NutriHubPatient.Application.Validators
{
    public class UpdatePatientProfileValidator : AbstractValidator<UpdatePatientProfileInput>
    {
        public UpdatePatientProfileValidator()
        {
            RuleFor(x => x.PatientId).NotEmpty().WithMessage("Patient ID is required.");
            RuleFor(x => x.Name).NotEmpty().Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");
            RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("Invalid email format.");
            RuleFor(x => x.AgeYears).GreaterThan(0).LessThanOrEqualTo(120);
            RuleFor(x => x.HeightCm).GreaterThanOrEqualTo(50).LessThanOrEqualTo(250);
            RuleFor(x => x.TargetWeightKg).GreaterThanOrEqualTo(20).LessThanOrEqualTo(300);
            RuleFor(x => x.Sex).IsInEnum();
            RuleFor(x => x.Objective).IsInEnum();
            RuleFor(x => x.ActivityLevel).IsInEnum();
        }
    }
}
