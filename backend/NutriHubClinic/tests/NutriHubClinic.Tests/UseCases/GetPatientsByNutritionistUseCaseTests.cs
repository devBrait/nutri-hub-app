using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.Validators;
using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Tests.Fakes;

namespace NutriHubClinic.Tests.UseCases;

public class GetPatientsByNutritionistUseCaseTests
{
    private static readonly Guid _nutritionistId = Guid.NewGuid();

    private static GetPatientsByNutritionistUseCase CreateUseCase(FakePatientRepository repository)
        => new(repository, new GetPatientsByNutritionistValidator());

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenIdIsEmpty()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = new GetPatientsByNutritionistInput { Id = Guid.Empty };

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.Validation, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenNutritionistNotFound()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = new GetPatientsByNutritionistInput { Id = _nutritionistId };

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.NotFound, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldReturnPatients_WhenNutritionistExists()
    {
        var patients = new[]
        {
            new Patient("João Silva", "joao@email.com", _nutritionistId),
            new Patient("Maria Santos", "maria@email.com", _nutritionistId)
        };
        var repository = new FakePatientRepository(
            nutritionists: [_nutritionistId],
            patients: patients
        );
        var useCase = CreateUseCase(repository);
        var input = new GetPatientsByNutritionistInput { Id = _nutritionistId };

        var result = await useCase.ExecuteAsync(input);

        Assert.True(result.Success);
        Assert.NotNull(result.Output);
        Assert.Equal(2, result.Output.Patients.Count());
        Assert.Contains(result.Output.Patients, p => p.Name == "João Silva");
        Assert.Contains(result.Output.Patients, p => p.Name == "Maria Santos");
    }

    [Fact]
    public async Task ExecuteAsync_ShouldReturnEmptyList_WhenNutritionistHasNoPatients()
    {
        var repository = new FakePatientRepository(nutritionists: [_nutritionistId]);
        var useCase = CreateUseCase(repository);
        var input = new GetPatientsByNutritionistInput { Id = _nutritionistId };

        var result = await useCase.ExecuteAsync(input);

        Assert.True(result.Success);
        Assert.NotNull(result.Output);
        Assert.Empty(result.Output.Patients);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldReturnInternalError_WhenRepositoryThrows()
    {
        var useCase = CreateUseCase(new FakePatientRepository(shouldThrow: true));
        var input = new GetPatientsByNutritionistInput { Id = _nutritionistId };

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.InternalError, result.ErrorType);
    }
}
