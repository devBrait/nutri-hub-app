using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetMyInvitations
{
    public class GetMyInvitationsUseCase : IGetMyInvitationsUseCase
    {
        private readonly IInvitationRepository _invitationRepository;

        public GetMyInvitationsUseCase(IInvitationRepository invitationRepository)
        {
            _invitationRepository = invitationRepository;
        }

        public async Task<Result<GetMyInvitationsOutput>> ExecuteAsync(Guid nutritionistId)
        {
            try
            {
                var invitations = await _invitationRepository.GetByNutritionistIdAsync(nutritionistId);

                return Result<GetMyInvitationsOutput>.Ok(new GetMyInvitationsOutput
                {
                    Invitations = invitations.Select(i => new InvitationItem
                    {
                        Id = i.Id,
                        Email = i.Email,
                        Token = i.Token,
                        Status = i.Status,
                        ExpirationDate = i.ExpirationDate,
                        CreatedAt = i.CreatedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetMyInvitationsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
