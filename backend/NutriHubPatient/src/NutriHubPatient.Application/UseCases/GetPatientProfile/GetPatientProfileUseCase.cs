using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.GetPatientProfile
{
    public class GetPatientProfileUseCase : IGetPatientProfileUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDailySummaryRepository _dailySummaryRepository;

        public GetPatientProfileUseCase(
            IPatientRepository patientRepository,
            IDailySummaryRepository dailySummaryRepository)
        {
            _patientRepository = patientRepository;
            _dailySummaryRepository = dailySummaryRepository;
        }

        public async Task<Result<GetPatientProfileOutput>> ExecuteAsync(GetPatientProfileInput input)
        {
            try
            {
                var patient = await _patientRepository.GetByIdAsync(input.PatientId);
                if (patient is null)
                    return Result<GetPatientProfileOutput>.Failure(
                        ErrorType.NotFound, $"Patient '{input.PatientId}' not found.");

                var activeGoal = await _dailySummaryRepository.GetActiveGoalAsync(input.PatientId);
                var weightHistory = (await _patientRepository.GetWeightHistoryAsync(input.PatientId)).ToList();

                int? ageYears = patient.DateOfBirth.HasValue
                    ? DateTime.UtcNow.Year - patient.DateOfBirth.Value.Year
                    : null;

                return Result<GetPatientProfileOutput>.Ok(new GetPatientProfileOutput
                {
                    PatientId = patient.Id,
                    Name = patient.Name,
                    Email = patient.Email,
                    Sex = patient.Sex,
                    AgeYears = ageYears,
                    HeightCm = patient.HeightCm,
                    Objective = activeGoal?.Objective,
                    ActivityLevel = activeGoal?.ActivityLevel,
                    TargetWeightKg = activeGoal?.TargetWeightKg,
                    DailyCalorieGoal = activeGoal?.DailyCalorieGoal,
                    CurrentWeightKg = weightHistory.LastOrDefault()?.WeightKg,
                    InitialWeightKg = weightHistory.FirstOrDefault()?.WeightKg,
                    WeightHistory = weightHistory.Select(w => new WeightEntryOutput
                    {
                        Id = w.Id,
                        WeightKg = w.WeightKg,
                        RecordedAt = w.RecordedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetPatientProfileOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
