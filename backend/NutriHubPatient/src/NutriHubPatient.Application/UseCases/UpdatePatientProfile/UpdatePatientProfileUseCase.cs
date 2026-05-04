using FluentValidation;
using NutriHubPatient.Application.UseCases.GetPatientProfile;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Enums;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.UpdatePatientProfile
{
    public class UpdatePatientProfileUseCase : IUpdatePatientProfileUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IDailySummaryRepository _dailySummaryRepository;
        private readonly IValidator<UpdatePatientProfileInput> _validator;

        public UpdatePatientProfileUseCase(
            IPatientRepository patientRepository,
            IDailySummaryRepository dailySummaryRepository,
            IValidator<UpdatePatientProfileInput> validator)
        {
            _patientRepository = patientRepository;
            _dailySummaryRepository = dailySummaryRepository;
            _validator = validator;
        }

        public async Task<Result<GetPatientProfileOutput>> ExecuteAsync(UpdatePatientProfileInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<GetPatientProfileOutput>.Failure(ErrorType.Validation, message);
                }

                var patient = await _patientRepository.GetByIdAsync(input.PatientId);
                if (patient is null)
                    return Result<GetPatientProfileOutput>.Failure(
                        ErrorType.NotFound, $"Patient '{input.PatientId}' not found.");

                var latestWeight = (await _patientRepository.GetWeightHistoryAsync(input.PatientId))
                    .LastOrDefault()?.WeightKg ?? 60m;

                var dailyCalorieGoal = CalculateDailyCalorieGoal(
                    input.Sex, input.AgeYears, input.HeightCm, latestWeight,
                    input.ActivityLevel, input.Objective);

                patient.UpdateProfile(input.Name, input.Email, input.Sex, input.AgeYears, input.HeightCm);

                var newGoal = new PatientGoal(
                    patient.Id, input.Objective, input.ActivityLevel,
                    input.TargetWeightKg, dailyCalorieGoal);

                await _patientRepository.UpdateProfileAsync(patient, newGoal);

                var weightHistory = (await _patientRepository.GetWeightHistoryAsync(input.PatientId)).ToList();

                return Result<GetPatientProfileOutput>.Ok(new GetPatientProfileOutput
                {
                    PatientId = patient.Id,
                    Name = patient.Name,
                    Email = patient.Email,
                    Sex = patient.Sex,
                    AgeYears = input.AgeYears,
                    HeightCm = patient.HeightCm,
                    Objective = newGoal.Objective,
                    ActivityLevel = newGoal.ActivityLevel,
                    TargetWeightKg = newGoal.TargetWeightKg,
                    DailyCalorieGoal = newGoal.DailyCalorieGoal,
                    CurrentWeightKg = weightHistory.LastOrDefault()?.WeightKg,
                    InitialWeightKg = weightHistory.FirstOrDefault()?.WeightKg,
                    WeightHistory = weightHistory.Select(w => new WeightEntryOutput
                    {
                        Id = w.Id,
                        WeightKg = w.WeightKg,
                        RecordedAt = w.RecordedAt
                    })
                }, "Profile updated successfully.");
            }
            catch (Exception)
            {
                return Result<GetPatientProfileOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static int CalculateDailyCalorieGoal(
            Sex sex, int age, decimal heightCm, decimal weightKg,
            ActivityLevel activityLevel, Objective objective)
        {
            double h = (double)heightCm;
            double w = (double)weightKg;

            double bmr = sex switch
            {
                Sex.Male   => 10 * w + 6.25 * h - 5 * age + 5,
                Sex.Female => 10 * w + 6.25 * h - 5 * age - 161,
                _          => 10 * w + 6.25 * h - 5 * age - 78,
            };

            double tdee = bmr * activityLevel switch
            {
                ActivityLevel.Sedentary        => 1.2,
                ActivityLevel.LightlyActive    => 1.375,
                ActivityLevel.ModeratelyActive => 1.55,
                ActivityLevel.VeryActive       => 1.725,
                ActivityLevel.Athlete          => 1.9,
                _                              => 1.2,
            };

            double adjusted = objective switch
            {
                Objective.LoseWeight => tdee - 500,
                Objective.GainMuscle => tdee + 300,
                _                    => tdee,
            };

            return (int)Math.Round(Math.Max(adjusted, 1200));
        }
    }
}
