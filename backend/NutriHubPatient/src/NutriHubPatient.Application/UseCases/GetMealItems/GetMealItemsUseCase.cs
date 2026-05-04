using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.GetMealItems
{
    public class GetMealItemsUseCase : IGetMealItemsUseCase
    {
        private readonly IMealRepository _mealRepository;
        private readonly IValidator<GetMealItemsInput> _validator;

        public GetMealItemsUseCase(IMealRepository mealRepository, IValidator<GetMealItemsInput> validator)
        {
            _mealRepository = mealRepository;
            _validator = validator;
        }

        public async Task<Result<GetMealItemsOutput>> ExecuteAsync(GetMealItemsInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<GetMealItemsOutput>.Failure(ErrorType.Validation, message);
                }

                var meal = await _mealRepository.GetByIdWithItemsAsync(input.MealId, input.PatientId);
                if (meal is null)
                    return Result<GetMealItemsOutput>.Failure(
                        ErrorType.NotFound,
                        $"Meal with ID '{input.MealId}' not found."
                    );

                return Result<GetMealItemsOutput>.Ok(new GetMealItemsOutput
                {
                    MealId = meal.Id,
                    Items = meal.Items.Select(i => new MealItemOutput
                    {
                        Id = i.Id,
                        FoodName = i.FoodName,
                        QuantityG = i.QuantityG,
                        Calories = i.Calories,
                        CarbsG = i.CarbsG,
                        ProteinG = i.ProteinG,
                        FatG = i.FatG,
                        CreatedAt = i.CreatedAt
                    })
                });
            }
            catch (Exception)
            {
                return Result<GetMealItemsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
