using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.DeleteMealItem
{
    public class DeleteMealItemUseCase : IDeleteMealItemUseCase
    {
        private readonly IMealRepository _mealRepository;
        private readonly IValidator<DeleteMealItemInput> _validator;

        public DeleteMealItemUseCase(IMealRepository mealRepository, IValidator<DeleteMealItemInput> validator)
        {
            _mealRepository = mealRepository;
            _validator = validator;
        }

        public async Task<Result<DeleteMealItemOutput>> ExecuteAsync(DeleteMealItemInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<DeleteMealItemOutput>.Failure(ErrorType.Validation, message);
                }

                var item = await _mealRepository.GetMealItemByIdAsync(input.MealItemId, input.PatientId);
                if (item is null)
                    return Result<DeleteMealItemOutput>.Failure(ErrorType.NotFound, "Meal item not found.");

                var meal = await _mealRepository.GetByIdAsync(input.MealId, input.PatientId);
                if (meal is null)
                    return Result<DeleteMealItemOutput>.Failure(ErrorType.NotFound, "Meal not found.");

                var dailySummary = await _mealRepository.GetDailySummaryByMealIdAsync(input.MealId, input.PatientId);
                if (dailySummary is null)
                    return Result<DeleteMealItemOutput>.Failure(ErrorType.NotFound, "Daily summary not found.");

                meal.SubtractTotals(item.Calories, item.CarbsG, item.ProteinG, item.FatG);
                dailySummary.SubtractTotals(item.Calories, item.CarbsG, item.ProteinG, item.FatG);

                await _mealRepository.DeleteItemAndUpdateTotalsAsync(item, meal, dailySummary);

                return Result<DeleteMealItemOutput>.Ok(
                    new DeleteMealItemOutput { MealItemId = input.MealItemId },
                    "Item removed successfully."
                );
            }
            catch (Exception)
            {
                return Result<DeleteMealItemOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
