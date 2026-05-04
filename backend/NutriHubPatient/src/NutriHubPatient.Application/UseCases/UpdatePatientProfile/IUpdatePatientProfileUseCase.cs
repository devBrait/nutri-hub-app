using NutriHubPatient.Domain.Common;
using NutriHubPatient.Application.UseCases.GetPatientProfile;

namespace NutriHubPatient.Application.UseCases.UpdatePatientProfile
{
    public interface IUpdatePatientProfileUseCase
    {
        Task<Result<GetPatientProfileOutput>> ExecuteAsync(UpdatePatientProfileInput input);
    }
}
