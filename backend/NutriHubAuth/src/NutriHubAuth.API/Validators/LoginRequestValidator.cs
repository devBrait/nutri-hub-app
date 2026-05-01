using FluentValidation;
using NutriHubAuth.API.Common;
using NutriHubAuth.API.Models.Requests;

namespace NutriHubAuth.API.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage(ErrorCodes.EmailRequired)
                .EmailAddress().WithMessage(ErrorCodes.EmailInvalidFormat);

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage(ErrorCodes.PasswordRequired);
        }
    }
}
