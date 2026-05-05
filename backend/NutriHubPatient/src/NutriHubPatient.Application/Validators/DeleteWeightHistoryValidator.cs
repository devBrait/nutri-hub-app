using FluentValidation;
using NutriHubPatient.Application.UseCases.DeleteWeightHistory;

namespace NutriHubPatient.Application.Validators
{
    public class DeleteWeightHistoryValidator : AbstractValidator<DeleteWeightHistoryInput>
    {
        public DeleteWeightHistoryValidator()
        {
            RuleFor(x => x.WeightHistoryId)
                .NotEmpty().WithMessage("Weight history ID is required.");

            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient ID is required.");
        }
    }
}
