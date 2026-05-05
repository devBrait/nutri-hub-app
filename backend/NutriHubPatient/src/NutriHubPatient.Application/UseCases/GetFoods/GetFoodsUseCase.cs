using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.GetFoods
{
    public class GetFoodsUseCase : IGetFoodsUseCase
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IValidator<GetFoodsInput> _validator;

        public GetFoodsUseCase(IFoodRepository foodRepository, IValidator<GetFoodsInput> validator)
        {
            _foodRepository = foodRepository;
            _validator = validator;
        }

        public async Task<Result<GetFoodsOutput>> ExecuteAsync(GetFoodsInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<GetFoodsOutput>.Failure(ErrorType.Validation, message);
                }

                var (foods, totalCount) = await _foodRepository.SearchAsync(input.Query, input.Page, input.PageSize);

                var totalPages = (int)Math.Ceiling((double)totalCount / input.PageSize);

                var output = new GetFoodsOutput
                {
                    Items = foods.Select(f => new FoodOutput
                    {
                        Id = f.Id,
                        Name = f.Name,
                        CaloriesPer100g = f.CaloriesPer100g,
                        MacrosPer100g = new FoodMacrosOutput
                        {
                            Carbs = f.CarbsPer100g,
                            Protein = f.ProteinPer100g,
                            Fat = f.FatPer100g
                        }
                    }).ToList(),
                    TotalCount = totalCount,
                    Page = input.Page,
                    PageSize = input.PageSize,
                    TotalPages = totalPages
                };

                return Result<GetFoodsOutput>.Ok(output);
            }
            catch (Exception)
            {
                return Result<GetFoodsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
