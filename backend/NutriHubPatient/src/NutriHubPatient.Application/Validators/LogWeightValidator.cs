using FluentValidation;
using NutriHubPatient.Application.UseCases.LogWeight;

namespace NutriHubPatient.Application.Validators
{
    public class LogWeightValidator : AbstractValidator<LogWeightInput>
    {
        public LogWeightValidator()
        {
            RuleFor(x => x.PatientId).NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.WeightKg)
                .GreaterThanOrEqualTo(20).WithMessage("Weight must be at least 20 kg.")
                .LessThanOrEqualTo(300).WithMessage("Weight must be at most 300 kg.");
        }
    }
}
