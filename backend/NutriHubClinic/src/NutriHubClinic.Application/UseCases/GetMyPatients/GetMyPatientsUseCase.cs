using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetMyPatients
{
    public class GetMyPatientsUseCase : IGetMyPatientsUseCase
    {
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IPatientRepository _patientRepository;

        public GetMyPatientsUseCase(
            INutritionistRepository nutritionistRepository,
            IPatientRepository patientRepository)
        {
            _nutritionistRepository = nutritionistRepository;
            _patientRepository = patientRepository;
        }

        public async Task<Result<GetMyPatientsOutput>> ExecuteAsync(Guid nutritionistId)
        {
            try
            {
                var exists = await _nutritionistRepository.ExistsAsync(nutritionistId);
                if (!exists)
                    return Result<GetMyPatientsOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist profile not found.");

                var patients = await _patientRepository.GetByNutritionistIdAsync(nutritionistId);

                return Result<GetMyPatientsOutput>.Ok(new GetMyPatientsOutput
                {
                    Patients = patients.Select(p => new PatientItem
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Email = p.Email,
                        LinkedAt = p.CreatedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetMyPatientsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
