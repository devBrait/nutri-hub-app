using NutriHubAuth.API.Repositories;

namespace NutriHubAuth.API.UseCases.Logout
{
    public class LogoutUseCase : ILogoutUseCase
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public LogoutUseCase(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task ExecuteAsync(Guid userId)
        {
            try
            {
                await _refreshTokenRepository.DeleteAllByUserIdAsync(userId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Logout failed: {ex.Message}", ex);
            }
        }
    }
}
