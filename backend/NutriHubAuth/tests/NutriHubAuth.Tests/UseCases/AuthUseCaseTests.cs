using Moq;
using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.UseCases;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.UseCases;

public class AuthUseCaseTests
{
    [Theory]
    [InlineData("existing@user.com")]
    [InlineData("EXISTING@USER.COM")]
    public async Task ExecuteAsync_ShouldFail_WhenEmailAlreadyExists(string requestEmail)
    {
        var existingUser = new User("Existing", "existing@user.com", "52998224725", "StrongPass1", UserRoles.Patient);
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(existingUser);

        var useCase = new AuthUseCase(userRepo.Object, new AuthRequestValidator());
        var request = new AuthRequest
        {
            Name = "Another User",
            Email = requestEmail,
            Document = "04.252.011/0001-10",
            Password = "StrongPass1",
            Role = UserRoles.Nutritionist
        };

        var response = await useCase.ExecuteAsync(request);

        Assert.False(response.Success);
        Assert.Contains("Email already registered.", response.Errors);
    }

    [Theory]
    [InlineData("529.982.247-25")]
    [InlineData("04252011000110")]
    public async Task ExecuteAsync_ShouldSaveUserAndReturnSuccess_WhenRequestIsValid(string document)
    {
        User? savedUser = null;
        var userRepo = new Mock<IUserRepository>();
        userRepo.Setup(r => r.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync((User?)null);
        userRepo.Setup(r => r.SaveAsync(It.IsAny<User>()))
            .Callback<User>(u => savedUser = u)
            .Returns(Task.CompletedTask);

        var useCase = new AuthUseCase(userRepo.Object, new AuthRequestValidator());
        var request = new AuthRequest
        {
            Name = "New User",
            Email = "new@user.com",
            Document = document,
            Password = "StrongPass1",
            Role = UserRoles.Patient
        };

        var response = await useCase.ExecuteAsync(request);

        Assert.True(response.Success);
        Assert.Equal("User registered successfully.", response.Message);
        Assert.NotNull(savedUser);
        Assert.Equal("new@user.com", savedUser.Email);
        Assert.Equal(document, savedUser.Document);
    }
}
