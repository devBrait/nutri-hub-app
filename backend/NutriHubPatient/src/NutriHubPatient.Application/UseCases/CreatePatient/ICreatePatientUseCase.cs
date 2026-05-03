using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.CreatePatient
{
    public interface ICreatePatientUseCase
    {
        Task<Result<CreatePatientOutput>> ExecuteAsync(CreatePatientInput input);
    }
}
