using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.LogWeight
{
    public class LogWeightUseCase : ILogWeightUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<LogWeightInput> _validator;

        public LogWeightUseCase(IPatientRepository patientRepository, IValidator<LogWeightInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<LogWeightOutput>> ExecuteAsync(LogWeightInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<LogWeightOutput>.Failure(ErrorType.Validation, message);
                }

                var patientExists = await _patientRepository.ExistsAsync(input.PatientId);
                if (!patientExists)
                    return Result<LogWeightOutput>.Failure(ErrorType.NotFound, $"Patient '{input.PatientId}' not found.");

                var entry = new WeightHistory(input.PatientId, input.WeightKg, input.RecordedAt, input.Notes);
                await _patientRepository.AddWeightAsync(entry);

                return Result<LogWeightOutput>.Ok(new LogWeightOutput
                {
                    Id = entry.Id,
                    WeightKg = entry.WeightKg,
                    RecordedAt = entry.RecordedAt
                }, "Weight logged successfully.");
            }
            catch (Exception)
            {
                return Result<LogWeightOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request."
                );
            }
        }
    }
}
