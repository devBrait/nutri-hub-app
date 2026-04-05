using NutriHubAuth.API.Models;
using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.UseCases;
using NutriHubAuth.API.Validators;
using NutriHubAuth.Tests.Fakes;

namespace NutriHubAuth.Tests.UseCases;

public class AuthUseCaseTests
{
    [Theory]
    [InlineData("existing@user.com")]
    [InlineData("EXISTING@USER.COM")]
    public async Task ExecuteAsync_ShouldFail_WhenEmailAlreadyExists(string requestEmail)
    {
        var existingUser = new User("Existing", "existing@user.com", "52998224725", "StrongPass1", UserRoles.Patient);
        var repository = new FakeUserRepository(existingUser);
        var useCase = new AuthUseCase(repository, new AuthRequestValidator());
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
        var repository = new FakeUserRepository();
        var useCase = new AuthUseCase(repository, new AuthRequestValidator());
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
        Assert.Single(repository.SavedUsers);
        Assert.Equal("new@user.com", repository.SavedUsers[0].Email);
        Assert.Equal(document, repository.SavedUsers[0].Document);
    }
}
