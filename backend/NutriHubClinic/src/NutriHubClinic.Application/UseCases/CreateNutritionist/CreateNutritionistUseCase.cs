using FluentValidation;
using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.CreateNutritionist
{
    public class CreateNutritionistUseCase : ICreateNutritionistUseCase
    {
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IValidator<CreateNutritionistInput> _validator;

        public CreateNutritionistUseCase(INutritionistRepository nutritionistRepository, IValidator<CreateNutritionistInput> validator)
        {
            _nutritionistRepository = nutritionistRepository;
            _validator = validator;
        }

        public async Task<Result<CreateNutritionistOutput>> ExecuteAsync(CreateNutritionistInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<CreateNutritionistOutput>.Failure(ErrorType.Validation, message);
                }

                var alreadyExists = await _nutritionistRepository.ExistsAsync(input.Id);
                if (alreadyExists)
                    return Result<CreateNutritionistOutput>.Failure(
                        ErrorType.Conflict,
                        "Nutritionist profile already exists for this account."
                    );

                var nutritionist = new Nutritionist(input.Id, input.Name, input.Email);
                await _nutritionistRepository.CreateAsync(nutritionist);

                return Result<CreateNutritionistOutput>.Ok(MapToOutput(nutritionist), "Nutritionist profile created successfully.");
            }
            catch (Exception)
            {
                return Result<CreateNutritionistOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static CreateNutritionistOutput MapToOutput(Nutritionist nutritionist) => new()
        {
            Id = nutritionist.Id,
            Name = nutritionist.Name,
            Email = nutritionist.Email,
            CreatedAt = nutritionist.CreatedAt
        };
    }
}
