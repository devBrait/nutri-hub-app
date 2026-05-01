using Moq;
using NutriHubAuth.API.Common;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.Services;
using NutriHubAuth.API.UseCases.Register;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.UseCases;

public class AuthUseCaseTests
{
    private static RegisterUseCase CreateUseCase(
        Mock<IUserRepository> userRepo,
        Mock<IRefreshTokenRepository>? refreshTokenRepo = null,
        Mock<ITokenService>? tokenService = null)
    {
        refreshTokenRepo ??= new Mock<IRefreshTokenRepository>();
        tokenService ??= new Mock<ITokenService>();
        return new RegisterUseCase(userRepo.Object, refreshTokenRepo.Object, tokenService.Object, new AuthRequestValidator());
    }

    [Theory]
    [InlineData("existing@user.com")]
    [InlineData("EXISTING@USER.COM")]
    public async Task ExecuteAsync_ShouldFail_WhenEmailAlreadyExists(string requestEmail)
    {
        var existingUser = new User("Existing", "existing@user.com", "StrongPass1", UserRoles.Patient);
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(existingUser);

        var useCase = CreateUseCase(userRepo);
        var request = new AuthRequest
        {
            Name = "Another User",
            Email = requestEmail,
            Password = "StrongPass1",
            Role = UserRoles.Nutritionist
        };

        var response = await useCase.ExecuteAsync(request);

        Assert.False(response.Success);
        Assert.Contains(ErrorCodes.EmailAlreadyRegistered, response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldSaveUserAndReturnTokens_WhenRequestIsValid()
    {
        User? savedUser = null;
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User?)null);
        userRepo.Setup(r => r.SaveAsync(It.IsAny<User>()))
            .Callback<User>(u => savedUser = u)
            .Returns(Task.CompletedTask);

        var refreshTokenRepo = new Mock<IRefreshTokenRepository>();
        refreshTokenRepo.Setup(r => r.SaveAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);

        var tokenService = new Mock<ITokenService>();
        tokenService.Setup(t => t.GenerateAccessToken(It.IsAny<User>())).Returns("access-token");
        tokenService.Setup(t => t.GenerateRefreshToken()).Returns("refresh-token");

        var useCase = CreateUseCase(userRepo, refreshTokenRepo, tokenService);
        var request = new AuthRequest
        {
            Name = "New User",
            Email = "new@user.com",
            Password = "StrongPass1",
            Role = UserRoles.Patient
        };

        var response = await useCase.ExecuteAsync(request);

        Assert.True(response.Success);
        Assert.Equal("User registered successfully.", response.Message);
        Assert.Equal("access-token", response.AccessToken);
        Assert.Equal("refresh-token", response.RefreshToken);
        Assert.NotNull(savedUser);
        Assert.Equal("new@user.com", savedUser.Email);
    }
}
