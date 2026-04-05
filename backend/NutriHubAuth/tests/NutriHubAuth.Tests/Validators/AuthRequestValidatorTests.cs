using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Validators;

namespace NutriHubAuth.Tests.Validators;

public class AuthRequestValidatorTests
{
    private readonly AuthRequestValidator _validator = new();

    [Theory]
    [InlineData("529.982.247-25")]
    [InlineData("52998224725")]
    public async Task ValidateAsync_ShouldBeValid_WhenDocumentIsValidCpf(string document)
    {
        var request = CreateValidRequest();
        request.Document = document;

        var result = await _validator.ValidateAsync(request);

        Assert.True(result.IsValid);
    }

    [Theory]
    [InlineData("04.252.011/0001-10")]
    [InlineData("04252011000110")]
    public async Task ValidateAsync_ShouldBeValid_WhenDocumentIsValidCnpj(string document)
    {
        var request = CreateValidRequest();
        request.Document = document;

        var result = await _validator.ValidateAsync(request);

        Assert.True(result.IsValid);
    }

    [Theory]
    [InlineData("12345678900")]
    [InlineData("11.111.111/1111-11")]
    public async Task ValidateAsync_ShouldReturnError_WhenDocumentIsInvalid(string document)
    {
        var request = CreateValidRequest();
        request.Document = document;

        var result = await _validator.ValidateAsync(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Document must be a valid CPF or CNPJ.");
    }

    private static AuthRequest CreateValidRequest() => new()
    {
        Name = "John Doe",
        Email = "john@doe.com",
        Document = "52998224725",
        Password = "StrongPass1",
        Role = UserRoles.Patient
    };
}
