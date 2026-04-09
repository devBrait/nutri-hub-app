using FluentValidation;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;

namespace NutriHubClinic.Application.Validators
{
    public class GetPatientsByNutritionistValidator : AbstractValidator<GetPatientsByNutritionistInput>
    {
        public GetPatientsByNutritionistValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Nutritionist ID is required.");
        }
    }
}
