using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Enums;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.AddWaterIntake
{
    public class AddWaterIntakeUseCase : IAddWaterIntakeUseCase
    {
        private static readonly MealType[] DefaultMealTypes =
            [MealType.Breakfast, MealType.Lunch, MealType.Snack, MealType.Dinner];

        private readonly IPatientRepository _patientRepository;
        private readonly IDailySummaryRepository _dailySummaryRepository;

        private readonly IValidator<AddWaterIntakeInput> _validator;

        public AddWaterIntakeUseCase(
            IPatientRepository patientRepository,
            IDailySummaryRepository dailySummaryRepository,
            IValidator<AddWaterIntakeInput> validator)
        {
            _patientRepository = patientRepository;
            _dailySummaryRepository = dailySummaryRepository;
            _validator = validator;
        }

        public async Task<Result<AddWaterIntakeOutput>> ExecuteAsync(AddWaterIntakeInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<AddWaterIntakeOutput>.Failure(ErrorType.Validation, message);
                }

                var patientExists = await _patientRepository.ExistsAsync(input.PatientId);
                if (!patientExists)
                    return Result<AddWaterIntakeOutput>.Failure(
                        ErrorType.NotFound,
                        $"Patient with ID '{input.PatientId}' not found."
                    );

                var existingSummary = await _dailySummaryRepository.GetWithMealsByDateAsync(input.PatientId, input.Date);

                DailySummary summary;
                if (existingSummary is null)
                {
                    var activeGoal = await _dailySummaryRepository.GetActiveGoalAsync(input.PatientId);
                    var calorieGoal = activeGoal?.DailyCalorieGoal ?? 2000;

                    summary = await _dailySummaryRepository.CreateWithDefaultMealsAsync(
                        input.PatientId, input.Date, calorieGoal, DefaultMealTypes);
                }
                else
                {
                    summary = existingSummary;
                }

                summary.AddWater(input.AmountMl);

                await _dailySummaryRepository.UpdateAsync(summary);

                return Result<AddWaterIntakeOutput>.Ok(new AddWaterIntakeOutput { TotalWaterMl = summary.WaterMl });
            }
            catch (Exception)
            {
                return Result<AddWaterIntakeOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
