using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.Validators;

public class AuthRequestValidatorTests
{
    private readonly AuthRequestValidator _validator = new();

    [Fact]
    public async Task ValidateAsync_ShouldBeValid_WhenRequestIsValid()
    {
        var result = await _validator.ValidateAsync(CreateValidRequest());

        Assert.True(result.IsValid);
    }

    [Theory]
    [InlineData("")]
    [InlineData("A")]
    public async Task ValidateAsync_ShouldReturnError_WhenNameIsInvalid(string name)
    {
        var request = CreateValidRequest();
        request.Name = name;

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
    }

    [Theory]
    [InlineData("")]
    [InlineData("not-an-email")]
    public async Task ValidateAsync_ShouldReturnError_WhenEmailIsInvalid(string email)
    {
        var request = CreateValidRequest();
        request.Email = email;

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
    }

    [Theory]
    [InlineData("short1A")]
    [InlineData("alllowercase1")]
    [InlineData("ALLUPPERCASE1")]
    [InlineData("NoNumbers!")]
    public async Task ValidateAsync_ShouldReturnError_WhenPasswordIsInvalid(string password)
    {
        var request = CreateValidRequest();
        request.Password = password;

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
    }

    private static AuthRequest CreateValidRequest() => new()
    {
        Name = "John Doe",
        Email = "john@doe.com",
        Password = "StrongPass1",
        Role = UserRoles.Patient
    };
}
