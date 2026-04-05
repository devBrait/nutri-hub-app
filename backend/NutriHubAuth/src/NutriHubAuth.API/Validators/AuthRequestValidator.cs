using FluentValidation;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Requests;

namespace NutriHubAuth.API.Validators
{
    public class AuthRequestValidator : AbstractValidator<AuthRequest>
    {
        public AuthRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .Length(2, 100).WithMessage("Name must be between 2 and 100 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.Document)
                .NotEmpty().WithMessage("Document is required.")
                .Must(IsValidCpfOrCnpj).WithMessage("Document must be a valid CPF or CNPJ.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(8).WithMessage("Password must be at least 8 characters.")
                .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
                .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
                .Matches(@"\d").WithMessage("Password must contain at least one number.");

            RuleFor(x => x.Role)
                .IsInEnum().WithMessage("Invalid role.");
        }

        private static bool IsValidCpfOrCnpj(string? document)
        {
            if (string.IsNullOrWhiteSpace(document))
            {
                return false;
            }

            var digits = new string(document.Where(char.IsDigit).ToArray());

            return digits.Length switch
            {
                11 => IsValidCpf(digits),
                14 => IsValidCnpj(digits),
                _ => false
            };
        }

        private static bool IsValidCpf(string cpf)
        {
            if (cpf.Distinct().Count() == 1)
            {
                return false;
            }

            var firstSum = 0;
            for (var i = 0; i < 9; i++)
            {
                firstSum += (cpf[i] - '0') * (10 - i);
            }

            var firstDigit = (firstSum * 10) % 11;
            if (firstDigit == 10)
            {
                firstDigit = 0;
            }

            if (firstDigit != cpf[9] - '0')
            {
                return false;
            }

            var secondSum = 0;
            for (var i = 0; i < 10; i++)
            {
                secondSum += (cpf[i] - '0') * (11 - i);
            }

            var secondDigit = (secondSum * 10) % 11;
            if (secondDigit == 10)
            {
                secondDigit = 0;
            }

            return secondDigit == cpf[10] - '0';
        }

        private static bool IsValidCnpj(string cnpj)
        {
            if (cnpj.Distinct().Count() == 1)
            {
                return false;
            }

            int[] firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            int[] secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

            var firstSum = 0;
            for (var i = 0; i < 12; i++)
            {
                firstSum += (cnpj[i] - '0') * firstWeights[i];
            }

            var firstRemainder = firstSum % 11;
            var firstDigit = firstRemainder < 2 ? 0 : 11 - firstRemainder;
            if (firstDigit != cnpj[12] - '0')
            {
                return false;
            }

            var secondSum = 0;
            for (var i = 0; i < 13; i++)
            {
                secondSum += (cnpj[i] - '0') * secondWeights[i];
            }

            var secondRemainder = secondSum % 11;
            var secondDigit = secondRemainder < 2 ? 0 : 11 - secondRemainder;

            return secondDigit == cnpj[13] - '0';
        }
    }
}
