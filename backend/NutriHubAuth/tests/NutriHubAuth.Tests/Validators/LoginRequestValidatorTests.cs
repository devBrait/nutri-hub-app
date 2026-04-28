using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.Validators;

public class LoginRequestValidatorTests
{
    private readonly LoginRequestValidator _validator = new();

    [Fact]
    public async Task ValidateAsync_ShouldBeValid_WhenRequestIsValid()
    {
        var request = new LoginRequest { Email = "user@test.com", Password = "StrongPass1" };

        var result = await _validator.ValidateAsync(request);

        Assert.True(result.IsValid);
    }

    [Fact]
    public async Task ValidateAsync_ShouldReturnError_WhenEmailIsEmpty()
    {
        var request = new LoginRequest { Email = "", Password = "StrongPass1" };

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Email is required.");
    }

    [Theory]
    [InlineData("notanemail")]
    [InlineData("@nodomain.com")]
    public async Task ValidateAsync_ShouldReturnError_WhenEmailIsInvalid(string email)
    {
        var request = new LoginRequest { Email = email, Password = "StrongPass1" };

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Invalid email format.");
    }

    [Fact]
    public async Task ValidateAsync_ShouldReturnError_WhenPasswordIsEmpty()
    {
        var request = new LoginRequest { Email = "user@test.com", Password = "" };

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Password is required.");
    }
}
