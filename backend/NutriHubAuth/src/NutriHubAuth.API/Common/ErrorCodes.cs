namespace NutriHubAuth.API.Common
{
    public static class ErrorCodes
    {
        public const string NameRequired = "NAME_REQUIRED";
        public const string NameInvalidLength = "NAME_INVALID_LENGTH";
        public const string EmailRequired = "EMAIL_REQUIRED";
        public const string EmailInvalidFormat = "EMAIL_INVALID_FORMAT";
        public const string PasswordRequired = "PASSWORD_REQUIRED";
        public const string PasswordTooShort = "PASSWORD_TOO_SHORT";
        public const string PasswordMissingUppercase = "PASSWORD_MISSING_UPPERCASE";
        public const string PasswordMissingLowercase = "PASSWORD_MISSING_LOWERCASE";
        public const string PasswordMissingNumber = "PASSWORD_MISSING_NUMBER";
        public const string RoleInvalid = "ROLE_INVALID";
        public const string EmailAlreadyRegistered = "EMAIL_ALREADY_REGISTERED";
        public const string InvalidCredentials = "INVALID_CREDENTIALS";
    }
}
