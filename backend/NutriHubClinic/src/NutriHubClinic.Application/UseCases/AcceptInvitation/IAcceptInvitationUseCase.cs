using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.AcceptInvitation
{
    public interface IAcceptInvitationUseCase
    {
        Task<Result<AcceptInvitationOutput>> ExecuteAsync(AcceptInvitationInput input);
    }
}
