using FluentValidation;
using NutriHubPatient.Application.UseCases.SaveOnboarding;
using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Application.Validators
{
    public class SaveOnboardingValidator : AbstractValidator<SaveOnboardingInput>
    {
        public SaveOnboardingValidator()
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.Sex)
                .IsInEnum().WithMessage("Sex must be Male, Female or Other.");

            RuleFor(x => x.AgeYears)
                .GreaterThan(0).WithMessage("Age is required.")
                .LessThanOrEqualTo(120).WithMessage("Age must be at most 120 years.");

            RuleFor(x => x.HeightCm)
                .NotEmpty().WithMessage("Height is required.")
                .GreaterThanOrEqualTo(50).WithMessage("Height must be at least 50 cm.")
                .LessThanOrEqualTo(250).WithMessage("Height must be at most 250 cm.");

            RuleFor(x => x.CurrentWeightKg)
                .NotEmpty().WithMessage("Current weight is required.")
                .GreaterThanOrEqualTo(20).WithMessage("Weight must be at least 20 kg.")
                .LessThanOrEqualTo(300).WithMessage("Weight must be at most 300 kg.");

            RuleFor(x => x.Objective)
                .IsInEnum().WithMessage("Objective must be LoseWeight, Maintain or GainMuscle.");

            RuleFor(x => x.TargetWeightKg)
                .NotEmpty().WithMessage("Target weight is required.")
                .GreaterThanOrEqualTo(20).WithMessage("Target weight must be at least 20 kg.")
                .LessThanOrEqualTo(300).WithMessage("Target weight must be at most 300 kg.");

            RuleFor(x => x.ActivityLevel)
                .IsInEnum().WithMessage("Activity level must be Sedentary, LightlyActive, ModeratelyActive, VeryActive or Athlete.");
        }
    }
}
