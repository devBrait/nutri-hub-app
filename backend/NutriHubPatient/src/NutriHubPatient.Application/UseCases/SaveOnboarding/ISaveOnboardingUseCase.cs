using NutriHubPatient.Domain.Common;

namespace NutriHubPatient.Application.UseCases.SaveOnboarding
{
    public interface ISaveOnboardingUseCase
    {
        Task<Result<SaveOnboardingOutput>> ExecuteAsync(SaveOnboardingInput input);
    }
}
