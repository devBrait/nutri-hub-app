namespace NutriHubClinic.Domain.Common
{
    public enum ErrorType
    {
        Validation,
        NotFound,
        Conflict,
        Forbidden,
        InternalError
    }

    public class Result<T> where T : class
    {
        public bool Success { get; }
        public string? Message { get; }
        public T? Output { get; }
        public ErrorType? ErrorType { get; }

        private Result(bool success, T? output, string? message, ErrorType? errorType)
        {
            Success = success;
            Output = output;
            Message = message;
            ErrorType = errorType;
        }

        public static Result<T> Ok(T output, string? message = null) => new(true, output, message, null);
        public static Result<T> Failure(ErrorType errorType, string message) => new(false, null, message, errorType);
    }
}
