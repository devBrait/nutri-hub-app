using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.UpdatePatientAccount
{
    public class UpdatePatientAccountUseCase : IUpdatePatientAccountUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<UpdatePatientAccountInput> _validator;

        public UpdatePatientAccountUseCase(IPatientRepository patientRepository, IValidator<UpdatePatientAccountInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<UpdatePatientAccountOutput>> ExecuteAsync(UpdatePatientAccountInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<UpdatePatientAccountOutput>.Failure(ErrorType.Validation, message);
                }

                var patient = await _patientRepository.GetByIdAsync(input.Id);
                if (patient is null)
                    return Result<UpdatePatientAccountOutput>.Failure(
                        ErrorType.NotFound,
                        $"Patient with ID '{input.Id}' not found."
                    );

                patient.UpdateAccount(input.Name, input.Email);
                await _patientRepository.UpdateAsync(patient);

                var output = MapToOutput(patient);
                return Result<UpdatePatientAccountOutput>.Ok(output);
            }
            catch (Exception)
            {
                return Result<UpdatePatientAccountOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static UpdatePatientAccountOutput MapToOutput(Patient patient)
        {
            return new UpdatePatientAccountOutput
            {
                Id = patient.Id,
                Name = patient.Name,
                Email = patient.Email,
                UpdatedAt = patient.UpdatedAt
            };
        }
    }
}
