using FluentValidation;
using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.UpdateNutritionistProfile
{
    public class UpdateNutritionistProfileUseCase : IUpdateNutritionistProfileUseCase
    {
        private readonly INutritionistRepository _nutritionistRepository;
        private readonly IValidator<UpdateNutritionistProfileInput> _validator;

        public UpdateNutritionistProfileUseCase(
            INutritionistRepository nutritionistRepository,
            IValidator<UpdateNutritionistProfileInput> validator)
        {
            _nutritionistRepository = nutritionistRepository;
            _validator = validator;
        }

        public async Task<Result<UpdateNutritionistProfileOutput>> ExecuteAsync(UpdateNutritionistProfileInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<UpdateNutritionistProfileOutput>.Failure(ErrorType.Validation, message);
                }

                var nutritionist = await _nutritionistRepository.GetByIdAsync(input.NutritionistId);
                if (nutritionist is null)
                    return Result<UpdateNutritionistProfileOutput>.Failure(
                        ErrorType.NotFound, "Nutritionist profile not found.");

                nutritionist.UpdateProfile(input.Name, input.Email, input.Crn);
                await _nutritionistRepository.UpdateAsync(nutritionist);

                return Result<UpdateNutritionistProfileOutput>.Ok(new UpdateNutritionistProfileOutput
                {
                    Id = nutritionist.Id,
                    Name = nutritionist.Name,
                    Email = nutritionist.Email,
                    Crn = nutritionist.Crn
                }, "Profile updated successfully.");
            }
            catch (Exception)
            {
                return Result<UpdateNutritionistProfileOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
