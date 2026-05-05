using NutriHubClinic.Domain.Common;

namespace NutriHubClinic.Application.UseCases.GetMyPatients
{
    public interface IGetMyPatientsUseCase
    {
        Task<Result<GetMyPatientsOutput>> ExecuteAsync(Guid nutritionistId);
    }
}
