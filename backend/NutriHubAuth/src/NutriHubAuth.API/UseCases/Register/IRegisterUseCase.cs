namespace NutriHubAuth.API.UseCases.Register
{
    public interface IRegisterUseCase<TRequest, TResponse>
    {
        Task<TResponse> ExecuteAsync(TRequest request);
    }
}
