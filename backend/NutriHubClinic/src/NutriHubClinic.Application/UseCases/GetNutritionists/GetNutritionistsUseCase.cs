using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetNutritionists
{
    public class GetNutritionistsUseCase : IGetNutritionistsUseCase
    {
        private readonly INutritionistRepository _repository;

        public GetNutritionistsUseCase(INutritionistRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<GetNutritionistsOutput>> ExecuteAsync()
        {
            try
            {
                var nutritionists = await _repository.GetAllAsync();
                var output = new GetNutritionistsOutput
                {
                    Items = nutritionists.Select(n => new NutritionistItemDto
                    {
                        Id = n.Id,
                        Name = n.Name,
                        Email = n.Email,
                        CreatedAt = n.CreatedAt
                    })
                };

                return Result<GetNutritionistsOutput>.Ok(output);
            }
            catch (Exception)
            {
                return Result<GetNutritionistsOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
