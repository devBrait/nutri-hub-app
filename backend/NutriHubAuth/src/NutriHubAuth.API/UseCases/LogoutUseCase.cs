using NutriHubAuth.API.Repositories;

namespace NutriHubAuth.API.UseCases
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
            await _refreshTokenRepository.DeleteAllByUserIdAsync(userId);
        }
    }
}
