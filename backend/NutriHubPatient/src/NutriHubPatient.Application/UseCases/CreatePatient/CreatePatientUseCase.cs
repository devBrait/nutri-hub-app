using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.CreatePatient
{
    public class CreatePatientUseCase : ICreatePatientUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<CreatePatientInput> _validator;

        public CreatePatientUseCase(IPatientRepository patientRepository, IValidator<CreatePatientInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<CreatePatientOutput>> ExecuteAsync(CreatePatientInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<CreatePatientOutput>.Failure(ErrorType.Validation, message);
                }

                var alreadyExists = await _patientRepository.ExistsAsync(input.Id);
                if (alreadyExists)
                    return Result<CreatePatientOutput>.Failure(
                        ErrorType.Conflict,
                        "Patient profile already exists for this account."
                    );

                var patient = new Patient(input.Id, input.Name, input.Email);
                await _patientRepository.CreateAsync(patient);

                return Result<CreatePatientOutput>.Ok(MapToOutput(patient), "Patient profile created successfully.");
            }
            catch (Exception)
            {
                return Result<CreatePatientOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }

        private static CreatePatientOutput MapToOutput(Patient patient) => new()
        {
            Id = patient.Id,
            Name = patient.Name,
            Email = patient.Email,
            CreatedAt = patient.CreatedAt
        };
    }
}
