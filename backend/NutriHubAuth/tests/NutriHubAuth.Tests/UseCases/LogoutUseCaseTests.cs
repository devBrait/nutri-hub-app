using Moq;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.UseCases.Logout;

namespace NutriHubAuth.Tests.UseCases;

public class LogoutUseCaseTests
{
    [Fact]
    public async Task ExecuteAsync_ShouldDeleteAllRefreshTokens_ForGivenUser()
    {
        var userId = Guid.NewGuid();
        var refreshTokenRepo = new Mock<IRefreshTokenRepository>();
        refreshTokenRepo.Setup(r => r.DeleteAllByUserIdAsync(userId)).Returns(Task.CompletedTask);

        var useCase = new LogoutUseCase(refreshTokenRepo.Object);
        await useCase.ExecuteAsync(userId);

        refreshTokenRepo.Verify(r => r.DeleteAllByUserIdAsync(userId), Times.Once);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldNotDeleteTokens_ForOtherUsers()
    {
        var userId = Guid.NewGuid();
        var otherUserId = Guid.NewGuid();
        var refreshTokenRepo = new Mock<IRefreshTokenRepository>();
        refreshTokenRepo.Setup(r => r.DeleteAllByUserIdAsync(It.IsAny<Guid>())).Returns(Task.CompletedTask);

        var useCase = new LogoutUseCase(refreshTokenRepo.Object);
        await useCase.ExecuteAsync(userId);

        refreshTokenRepo.Verify(r => r.DeleteAllByUserIdAsync(otherUserId), Times.Never);
    }
}
