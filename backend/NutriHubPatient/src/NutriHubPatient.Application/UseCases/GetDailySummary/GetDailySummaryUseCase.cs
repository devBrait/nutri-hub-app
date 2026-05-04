using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Enums;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.GetDailySummary
{
    public class GetDailySummaryUseCase : IGetDailySummaryUseCase
    {
        private const int WaterGoalMl = 3000;

        private static readonly MealType[] DefaultMealTypes =
            [MealType.Breakfast, MealType.Lunch, MealType.Snack, MealType.Dinner];

        private readonly IPatientRepository _patientRepository;
        private readonly IDailySummaryRepository _dailySummaryRepository;
        private readonly IValidator<GetDailySummaryInput> _validator;

        public GetDailySummaryUseCase(
            IPatientRepository patientRepository,
            IDailySummaryRepository dailySummaryRepository,
            IValidator<GetDailySummaryInput> validator)
        {
            _patientRepository = patientRepository;
            _dailySummaryRepository = dailySummaryRepository;
            _validator = validator;
        }

        public async Task<Result<GetDailySummaryOutput>> ExecuteAsync(GetDailySummaryInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<GetDailySummaryOutput>.Failure(ErrorType.Validation, message);
                }

                var patientExists = await _patientRepository.ExistsAsync(input.PatientId);
                if (!patientExists)
                    return Result<GetDailySummaryOutput>.Failure(
                        ErrorType.NotFound,
                        $"Patient with ID '{input.PatientId}' not found."
                    );

                var activeGoal = await _dailySummaryRepository.GetActiveGoalAsync(input.PatientId);
                var calorieGoal = activeGoal?.DailyCalorieGoal ?? 2000;

                var summary = await _dailySummaryRepository.GetWithMealsByDateAsync(input.PatientId, input.Date)
                    ?? await _dailySummaryRepository.CreateWithDefaultMealsAsync(
                        input.PatientId, input.Date, calorieGoal, DefaultMealTypes);

                var (carbsGoalG, proteinGoalG, fatGoalG) = CalculateMacroGoals(calorieGoal);

                var progressPercent = summary.CalorieGoal > 0
                    ? (int)Math.Min(Math.Round((double)summary.TotalCalories / summary.CalorieGoal * 100), 100)
                    : 0;

                var output = new GetDailySummaryOutput
                {
                    Date = summary.Date,
                    WaterMl = summary.WaterMl,
                    WaterGoalMl = WaterGoalMl,
                    CaloriesConsumed = summary.TotalCalories,
                    CaloriesGoal = summary.CalorieGoal,
                    ProgressPercent = progressPercent,
                    CarbsG = summary.TotalCarbsG,
                    ProteinG = summary.TotalProteinG,
                    FatG = summary.TotalFatG,
                    CarbsGoalG = carbsGoalG,
                    ProteinGoalG = proteinGoalG,
                    FatGoalG = fatGoalG,
                    Meals = summary.Meals.OrderBy(m => m.MealType).Select(m => new MealSummaryOutput
                    {
                        Id = m.Id,
                        MealType = m.MealType,
                        CaloriesConsumed = m.TotalCalories,
                        CarbsG = m.TotalCarbsG,
                        ProteinG = m.TotalProteinG,
                        FatG = m.TotalFatG
                    })
                };

                return Result<GetDailySummaryOutput>.Ok(output);
            }
            catch (Exception)
            {
                return Result<GetDailySummaryOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static (decimal carbsGoalG, decimal proteinGoalG, decimal fatGoalG) CalculateMacroGoals(int calorieGoal)
        {
            var carbsGoalG = Math.Round((decimal)(calorieGoal * 0.50 / 4), 1);
            var proteinGoalG = Math.Round((decimal)(calorieGoal * 0.25 / 4), 1);
            var fatGoalG = Math.Round((decimal)(calorieGoal * 0.25 / 9), 1);
            return (carbsGoalG, proteinGoalG, fatGoalG);
        }
    }
}
