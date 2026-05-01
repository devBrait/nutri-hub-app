using FluentValidation;
using NutriHubAuth.API.Common;
using NutriHubAuth.API.Models.Requests;

namespace NutriHubAuth.API.Validators
{
    public class AuthRequestValidator : AbstractValidator<AuthRequest>
    {
        public AuthRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage(ErrorCodes.NameRequired)
                .Length(2, 100).WithMessage(ErrorCodes.NameInvalidLength);

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage(ErrorCodes.EmailRequired)
                .EmailAddress().WithMessage(ErrorCodes.EmailInvalidFormat);

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage(ErrorCodes.PasswordRequired)
                .MinimumLength(8).WithMessage(ErrorCodes.PasswordTooShort)
                .Matches(@"[A-Z]").WithMessage(ErrorCodes.PasswordMissingUppercase)
                .Matches(@"[a-z]").WithMessage(ErrorCodes.PasswordMissingLowercase)
                .Matches(@"\d").WithMessage(ErrorCodes.PasswordMissingNumber);

            RuleFor(x => x.Role)
                .IsInEnum().WithMessage(ErrorCodes.RoleInvalid);
        }
    }
}
