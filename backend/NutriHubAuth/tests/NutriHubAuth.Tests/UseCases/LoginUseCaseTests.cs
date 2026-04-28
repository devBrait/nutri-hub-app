using Moq;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.Services;
using NutriHubAuth.API.UseCases;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.UseCases;

public class LoginUseCaseTests
{
    private static LoginUseCase CreateUseCase(
        Mock<IUserRepository>? userRepo = null,
        Mock<IRefreshTokenRepository>? refreshTokenRepo = null,
        Mock<ITokenService>? tokenService = null)
    {
        userRepo ??= new Mock<IUserRepository>();
        refreshTokenRepo ??= new Mock<IRefreshTokenRepository>();
        tokenService ??= new Mock<ITokenService>();

        tokenService.Setup(t => t.GenerateAccessToken(It.IsAny<User>())).Returns("access-token");
        tokenService.Setup(t => t.GenerateRefreshToken()).Returns("refresh-token");
        refreshTokenRepo.Setup(r => r.SaveAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);

        return new LoginUseCase(userRepo.Object, refreshTokenRepo.Object, tokenService.Object, new LoginRequestValidator());
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenEmailIsEmpty()
    {
        var useCase = CreateUseCase();

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "", Password = "StrongPass1" });

        Assert.False(response.Success);
        Assert.Contains("Email is required.", response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenEmailIsInvalid()
    {
        var useCase = CreateUseCase();

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "not-an-email", Password = "StrongPass1" });

        Assert.False(response.Success);
        Assert.Contains("Invalid email format.", response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenPasswordIsEmpty()
    {
        var useCase = CreateUseCase();

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "user@test.com", Password = "" });

        Assert.False(response.Success);
        Assert.Contains("Password is required.", response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenUserDoesNotExist()
    {
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User?)null);
        var useCase = CreateUseCase(userRepo: userRepo);

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "notfound@test.com", Password = "StrongPass1" });

        Assert.False(response.Success);
        Assert.Contains("Invalid email or password.", response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenPasswordIsWrong()
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword("CorrectPass1");
        var existingUser = new User("User", "user@test.com", "52998224725", passwordHash, UserRoles.Patient);
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(existingUser);
        var useCase = CreateUseCase(userRepo: userRepo);

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "user@test.com", Password = "WrongPass1" });

        Assert.False(response.Success);
        Assert.Contains("Invalid email or password.", response.Errors);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldReturnTokens_WhenCredentialsAreValid()
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword("StrongPass1");
        var existingUser = new User("User", "user@test.com", "52998224725", passwordHash, UserRoles.Patient);
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(existingUser);
        var refreshTokenRepo = new Mock<IRefreshTokenRepository>();
        refreshTokenRepo.Setup(r => r.SaveAsync(It.IsAny<RefreshToken>())).Returns(Task.CompletedTask);
        var useCase = CreateUseCase(userRepo: userRepo, refreshTokenRepo: refreshTokenRepo);

        var response = await useCase.ExecuteAsync(new LoginRequest { Email = "user@test.com", Password = "StrongPass1" });

        Assert.True(response.Success);
        Assert.NotNull(response.AccessToken);
        Assert.NotNull(response.RefreshToken);
        Assert.Equal(existingUser.Id, response.UserId);
        refreshTokenRepo.Verify(r => r.SaveAsync(It.IsAny<RefreshToken>()), Times.Once);
    }
}
