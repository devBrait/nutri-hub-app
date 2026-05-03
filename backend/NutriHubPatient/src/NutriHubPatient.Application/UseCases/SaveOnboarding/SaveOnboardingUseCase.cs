using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Enums;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.SaveOnboarding
{
    public class SaveOnboardingUseCase : ISaveOnboardingUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<SaveOnboardingInput> _validator;

        public SaveOnboardingUseCase(IPatientRepository patientRepository, IValidator<SaveOnboardingInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<SaveOnboardingOutput>> ExecuteAsync(SaveOnboardingInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<SaveOnboardingOutput>.Failure(ErrorType.Validation, message);
                }

                var patient = await _patientRepository.GetByIdAsync(input.PatientId);
                if (patient is null)
                    return Result<SaveOnboardingOutput>.Failure(
                        ErrorType.NotFound,
                        $"Patient with ID '{input.PatientId}' not found."
                    );

                var dailyCalorieGoal = CalculateDailyCalorieGoal(
                    input.Sex, input.AgeYears, input.HeightCm, input.CurrentWeightKg,
                    input.ActivityLevel, input.Objective
                );

                patient.SaveOnboarding(input.Sex, input.AgeYears, input.HeightCm);

                var weightHistory = new WeightHistory(patient.Id, input.CurrentWeightKg);
                var patientGoal = new PatientGoal(
                    patient.Id,
                    input.Objective,
                    input.ActivityLevel,
                    input.TargetWeightKg,
                    dailyCalorieGoal
                );

                await _patientRepository.SaveOnboardingAsync(patient, weightHistory, patientGoal);

                return Result<SaveOnboardingOutput>.Ok(new SaveOnboardingOutput
                {
                    PatientId = patient.Id,
                    HeightCm = input.HeightCm,
                    CurrentWeightKg = input.CurrentWeightKg,
                    Objective = input.Objective,
                    TargetWeightKg = input.TargetWeightKg,
                    ActivityLevel = input.ActivityLevel,
                    DailyCalorieGoal = dailyCalorieGoal
                }, "Onboarding completed successfully.");
            }
            catch (Exception)
            {
                return Result<SaveOnboardingOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static int CalculateDailyCalorieGoal(
            Sex sex, int age, decimal heightCm, decimal weightKg,
            ActivityLevel activityLevel, Objective objective)
        {
            // Mifflin-St Jeor equation
            double h = (double)heightCm;
            double w = (double)weightKg;

            double bmr = sex switch
            {
                Sex.Male   => 10 * w + 6.25 * h - 5 * age + 5,
                Sex.Female => 10 * w + 6.25 * h - 5 * age - 161,
                _          => 10 * w + 6.25 * h - 5 * age - 78,  // média
            };

            double tdee = bmr * activityLevel switch
            {
                ActivityLevel.Sedentary         => 1.2,
                ActivityLevel.LightlyActive     => 1.375,
                ActivityLevel.ModeratelyActive  => 1.55,
                ActivityLevel.VeryActive        => 1.725,
                ActivityLevel.Athlete           => 1.9,
                _                               => 1.2,
            };

            double adjusted = objective switch
            {
                Objective.LoseWeight  => tdee - 500,
                Objective.GainMuscle  => tdee + 300,
                _                     => tdee,
            };

            return (int)Math.Round(Math.Max(adjusted, 1200));
        }
    }
}
