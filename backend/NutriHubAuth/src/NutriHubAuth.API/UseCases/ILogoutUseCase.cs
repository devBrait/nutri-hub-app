namespace NutriHubAuth.API.UseCases
{
    public interface ILogoutUseCase
    {
        Task ExecuteAsync(Guid userId);
    }
}
