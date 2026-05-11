using FluentValidation;
using NutriHubPatient.Application.UseCases.AddWaterIntake;

namespace NutriHubPatient.Application.Validators
{
    public class AddWaterIntakeValidator : AbstractValidator<AddWaterIntakeInput>
    {
        public AddWaterIntakeValidator()
        {
            RuleFor(x => x.PatientId).NotEmpty().WithMessage("Patient ID is required.");
            RuleFor(x => x.Date).NotEmpty().WithMessage("Date is required.");
            RuleFor(x => x.AmountMl).GreaterThan(0).WithMessage("Amount must be greater than 0.");
        }
    }
}
