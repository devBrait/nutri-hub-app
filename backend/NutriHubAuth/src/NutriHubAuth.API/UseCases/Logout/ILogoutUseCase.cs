namespace NutriHubAuth.API.UseCases.Logout
{
    public interface ILogoutUseCase
    {
        Task ExecuteAsync(Guid userId);
    }
}
