using NutriHubPatient.Application.UseCases.UpdatePatientAccount;
using NutriHubPatient.Application.Validators;

namespace NutriHubPatient.Tests.Validators;

public class UpdatePatientAccountValidatorTests
{
    private readonly UpdatePatientAccountValidator _validator = new();

    private static UpdatePatientAccountInput CreateValidInput() => new()
    {
        Id = Guid.NewGuid(),
        Name = "João Silva",
        Email = "joao@email.com"
    };

    [Fact]
    public async Task ValidateAsync_ShouldBeValid_WhenInputIsValid()
    {
        var result = await _validator.ValidateAsync(CreateValidInput());

        Assert.True(result.IsValid);
    }

    [Fact]
    public async Task ValidateAsync_ShouldFail_WhenIdIsEmpty()
    {
        var input = CreateValidInput();
        input.Id = Guid.Empty;

        var result = await _validator.ValidateAsync(input);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Patient ID is required.");
    }

    [Fact]
    public async Task ValidateAsync_ShouldFail_WhenNameIsEmpty()
    {
        var input = CreateValidInput();
        input.Name = string.Empty;

        var result = await _validator.ValidateAsync(input);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Name is required.");
    }

    [Theory]
    [InlineData("A")]
    [InlineData("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")]
    public async Task ValidateAsync_ShouldFail_WhenNameLengthIsOutOfRange(string name)
    {
        var input = CreateValidInput();
        input.Name = name;

        var result = await _validator.ValidateAsync(input);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Name must be between 2 and 100 characters.");
    }

    [Theory]
    [InlineData("")]
    [InlineData("not-an-email")]
    [InlineData("missing@")]
    public async Task ValidateAsync_ShouldFail_WhenEmailIsInvalid(string email)
    {
        var input = CreateValidInput();
        input.Email = email;

        var result = await _validator.ValidateAsync(input);

        Assert.False(result.IsValid);
    }
}
