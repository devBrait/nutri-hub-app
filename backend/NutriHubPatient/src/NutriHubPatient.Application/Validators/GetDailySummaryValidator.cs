using FluentValidation;
using NutriHubPatient.Application.UseCases.GetDailySummary;

namespace NutriHubPatient.Application.Validators
{
    public class GetDailySummaryValidator : AbstractValidator<GetDailySummaryInput>
    {
        public GetDailySummaryValidator()
        {
            RuleFor(x => x.PatientId)
                .NotEmpty().WithMessage("Patient ID is required.");

            RuleFor(x => x.Date)
                .NotEmpty().WithMessage("Date is required.")
                .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)))
                .WithMessage("Date cannot be in the future.");
        }
    }
}
