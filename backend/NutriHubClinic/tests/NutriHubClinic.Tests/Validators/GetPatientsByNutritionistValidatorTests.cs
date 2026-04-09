using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.Validators;

namespace NutriHubClinic.Tests.Validators;

public class GetPatientsByNutritionistValidatorTests
{
    private readonly GetPatientsByNutritionistValidator _validator = new();

    [Fact]
    public async Task ValidateAsync_ShouldBeValid_WhenIdIsValid()
    {
        var input = new GetPatientsByNutritionistInput { Id = Guid.NewGuid() };

        var result = await _validator.ValidateAsync(input);

        Assert.True(result.IsValid);
    }

    [Fact]
    public async Task ValidateAsync_ShouldFail_WhenIdIsEmpty()
    {
        var input = new GetPatientsByNutritionistInput { Id = Guid.Empty };

        var result = await _validator.ValidateAsync(input);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, e => e.ErrorMessage == "Nutritionist ID is required.");
    }
}
