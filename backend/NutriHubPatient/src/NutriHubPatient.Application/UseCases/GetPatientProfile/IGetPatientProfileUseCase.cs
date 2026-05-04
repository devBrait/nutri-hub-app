using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.GetPatientProfile
{
    public interface IGetPatientProfileUseCase
    {
        Task<Result<GetPatientProfileOutput>> ExecuteAsync(GetPatientProfileInput input);
    }
}
