using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetMyInvitations
{
    public interface IGetMyInvitationsUseCase
    {
        Task<Result<GetMyInvitationsOutput>> ExecuteAsync(Guid nutritionistId);
    }
}
