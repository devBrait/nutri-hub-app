using FluentValidation;
using NutriHubPatient.Domain.Common;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Application.UseCases.DeleteWeightHistory
{
    public class DeleteWeightHistoryUseCase : IDeleteWeightHistoryUseCase
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IValidator<DeleteWeightHistoryInput> _validator;

        public DeleteWeightHistoryUseCase(
            IPatientRepository patientRepository,
            IValidator<DeleteWeightHistoryInput> validator)
        {
            _patientRepository = patientRepository;
            _validator = validator;
        }

        public async Task<Result<DeleteWeightHistoryOutput>> ExecuteAsync(DeleteWeightHistoryInput input)
        {
            try
            {
                var validation = await _validator.ValidateAsync(input);
                if (!validation.IsValid)
                {
                    var message = string.Join("; ", validation.Errors.Select(e => e.ErrorMessage));
                    return Result<DeleteWeightHistoryOutput>.Failure(ErrorType.Validation, message);
                }

                var history = (await _patientRepository.GetWeightHistoryAsync(input.PatientId)).ToList();

                if (history.Count == 0)
                    return Result<DeleteWeightHistoryOutput>.Failure(
                        ErrorType.NotFound, "Registro de peso não encontrado.");

                var initialEntry = history.First();
                if (initialEntry.Id == input.WeightHistoryId)
                    return Result<DeleteWeightHistoryOutput>.Failure(
                        ErrorType.Validation, "O peso inicial não pode ser removido.");

                var exists = history.Any(w => w.Id == input.WeightHistoryId);
                if (!exists)
                    return Result<DeleteWeightHistoryOutput>.Failure(
                        ErrorType.NotFound, "Registro de peso não encontrado.");

                await _patientRepository.DeleteWeightAsync(input.WeightHistoryId, input.PatientId);

                return Result<DeleteWeightHistoryOutput>.Ok(
                    new DeleteWeightHistoryOutput { DeletedId = input.WeightHistoryId },
                    "Registro removido com sucesso.");
            }
            catch (Exception)
            {
                return Result<DeleteWeightHistoryOutput>.Failure(
                    ErrorType.InternalError,
                    "An unexpected error occurred while processing the request.");
            }
        }
    }
}
