using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.InvitePatient
{
    public interface IInvitePatientUseCase
    {
        Task<Result<InvitePatientOutput>> ExecuteAsync(InvitePatientInput input);
    }
}
