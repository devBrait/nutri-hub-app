using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.UpdatePatientAccount
{
    public interface IUpdatePatientAccountUseCase
    {
        Task<Result<UpdatePatientAccountOutput>> ExecuteAsync(UpdatePatientAccountInput input);
    }
}
