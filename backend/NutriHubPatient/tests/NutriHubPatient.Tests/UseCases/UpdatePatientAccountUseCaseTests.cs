using NutriHubPatient.Application.UseCases.UpdatePatientAccount;
using NutriHubPatient.Application.Validators;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Tests.Fakes;

namespace NutriHubPatient.Tests.UseCases;

public class UpdatePatientAccountUseCaseTests
{
    private static readonly Guid _patientId = Guid.NewGuid();

    private static UpdatePatientAccountUseCase CreateUseCase(FakePatientRepository repository)
        => new(repository, new UpdatePatientAccountValidator());

    private static UpdatePatientAccountInput CreateValidInput(Guid? id = null) => new()
    {
        Id = id ?? _patientId,
        Name = "João Atualizado",
        Email = "joao.atualizado@email.com"
    };

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenIdIsEmpty()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = CreateValidInput(Guid.Empty);

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.Validation, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenNameIsEmpty()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = CreateValidInput();
        input.Name = string.Empty;

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.Validation, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenEmailIsInvalid()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = CreateValidInput();
        input.Email = "not-an-email";

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.Validation, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldFail_WhenPatientNotFound()
    {
        var useCase = CreateUseCase(new FakePatientRepository());
        var input = CreateValidInput();

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.NotFound, result.ErrorType);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldUpdateAndReturnOutput_WhenInputIsValid()
    {
        var patient = new Patient(_patientId, "João Silva", "joao@email.com");
        var repository = new FakePatientRepository(patients: [patient]);
        var useCase = CreateUseCase(repository);
        var input = CreateValidInput();

        var result = await useCase.ExecuteAsync(input);

        Assert.True(result.Success);
        Assert.NotNull(result.Output);
        Assert.Equal(_patientId, result.Output.Id);
        Assert.Equal("João Atualizado", result.Output.Name);
        Assert.Equal("joao.atualizado@email.com", result.Output.Email);
        Assert.Single(repository.UpdatedPatients);
    }

    [Fact]
    public async Task ExecuteAsync_ShouldReturnInternalError_WhenRepositoryThrows()
    {
        var useCase = CreateUseCase(new FakePatientRepository(shouldThrow: true));
        var input = CreateValidInput();

        var result = await useCase.ExecuteAsync(input);

        Assert.False(result.Success);
        Assert.Equal(ErrorType.InternalError, result.ErrorType);
    }
}
