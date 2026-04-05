namespace NutriHubAuth.API.UseCases
{
    public interface IAuthUseCase<TRequest, TResponse>
    {
        Task<TResponse> ExecuteAsync(TRequest request);
    }
}
