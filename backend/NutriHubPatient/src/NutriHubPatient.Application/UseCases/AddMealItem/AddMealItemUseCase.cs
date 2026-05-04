using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.AddMealItem
{
    public class AddMealItemUseCase : IAddMealItemUseCase
    {
        private readonly IMealRepository _mealRepository;
        private readonly IValidator<AddMealItemInput> _validator;

        public AddMealItemUseCase(IMealRepository mealRepository, IValidator<AddMealItemInput> validator)
        {
            _mealRepository = mealRepository;
            _validator = validator;
        }

        public async Task<Result<AddMealItemOutput>> ExecuteAsync(AddMealItemInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<AddMealItemOutput>.Failure(ErrorType.Validation, message);
                }

                var meal = await _mealRepository.GetByIdAsync(input.MealId, input.PatientId);
                if (meal is null)
                    return Result<AddMealItemOutput>.Failure(
                        ErrorType.NotFound,
                        $"Meal with ID '{input.MealId}' not found."
                    );

                var dailySummary = await _mealRepository.GetDailySummaryByMealIdAsync(input.MealId, input.PatientId);
                if (dailySummary is null)
                    return Result<AddMealItemOutput>.Failure(
                        ErrorType.NotFound,
                        "Daily summary for this meal was not found."
                    );

                var item = new MealItem(
                    meal.Id,
                    input.FoodName,
                    input.QuantityG,
                    input.Calories,
                    input.CarbsG,
                    input.ProteinG,
                    input.FatG,
                    input.FoodId
                );

                meal.UpdateTotals(input.Calories, input.CarbsG, input.ProteinG, input.FatG);
                dailySummary.UpdateTotals(input.Calories, input.CarbsG, input.ProteinG, input.FatG);

                await _mealRepository.AddItemAndUpdateTotalsAsync(item, meal, dailySummary);

                return Result<AddMealItemOutput>.Ok(new AddMealItemOutput
                {
                    Id = item.Id,
                    FoodName = item.FoodName,
                    QuantityG = item.QuantityG,
                    Calories = item.Calories,
                    CarbsG = item.CarbsG,
                    ProteinG = item.ProteinG,
                    FatG = item.FatG,
                    CreatedAt = item.CreatedAt
                }, "Item added successfully.");
            }
            catch (Exception)
            {
                return Result<AddMealItemOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
