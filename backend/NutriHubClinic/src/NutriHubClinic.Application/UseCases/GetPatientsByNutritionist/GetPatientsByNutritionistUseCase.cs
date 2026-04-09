using FluentValidation;
using NutriHubClinic.Domain.Common;
using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Application.UseCases.GetPatientsByNutritionist
{
    public class GetPatientsByNutritionistUseCase : IGetPatientsByNutritionistUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<GetPatientsByNutritionistInput> _validator;

        public GetPatientsByNutritionistUseCase(IPatientRepository patientRepository, IValidator<GetPatientsByNutritionistInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<GetPatientsByNutritionistOutput>> ExecuteAsync(GetPatientsByNutritionistInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<GetPatientsByNutritionistOutput>.Failure(ErrorType.Validation, message);
                }

                var exists = await _patientRepository.NutritionistExistsAsync(input.Id);
                if (!exists)
                    return Result<GetPatientsByNutritionistOutput>.Failure(
                        ErrorType.NotFound,
                        $"Nutritionist with ID '{input.Id}' not found."
                    );

                var patients = await _patientRepository.GetByNutritionistIdAsync(input.Id);
                var output = MapToOutput(patients);

                return Result<GetPatientsByNutritionistOutput>.Ok(output);
            }
            catch (Exception)
            {
                return Result<GetPatientsByNutritionistOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private GetPatientsByNutritionistOutput MapToOutput(IEnumerable<Patient> patients)
        {
            return new GetPatientsByNutritionistOutput
            {
                Patients = patients.Select(p => new PatientOutput
                {
                    Id = p.Id,
                    Name = p.Name,
                    Email = p.Email,
                    CreatedAt = p.CreatedAt
                })
            };
        }
    }
}
