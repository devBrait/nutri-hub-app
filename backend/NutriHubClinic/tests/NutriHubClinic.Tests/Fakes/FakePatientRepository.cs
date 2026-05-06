using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Tests.Fakes;

internal sealed class FakePatientRepository : IPatientRepository
{
    private readonly HashSet<Guid> _existingNutritionists;
    private readonly List<Patient> _patients;
    private readonly bool _shouldThrow;

    public FakePatientRepository(
        IEnumerable<Guid>? nutritionists = null,
        IEnumerable<Patient>? patients = null,
        bool shouldThrow = false)
    {
        _existingNutritionists = new HashSet<Guid>(nutritionists ?? []);
        _patients = [.. (patients ?? [])];
        _shouldThrow = shouldThrow;
    }

    public Task<bool> NutritionistExistsAsync(Guid nutritionistId)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.FromResult(_existingNutritionists.Contains(nutritionistId));
    }

    public Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        var patients = _patients.Where(p => p.NutritionistId == nutritionistId);
        return Task.FromResult(patients);
    }

    public Task<Patient?> GetByPatientIdAsync(Guid patientId)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.FromResult(_patients.FirstOrDefault(p => p.Id == patientId));
    }

    public Task AddAsync(Patient patient)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        _patients.Add(patient);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Patient patient)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        var existing = _patients.FirstOrDefault(p => p.Id == patient.Id);
        if (existing is not null)
        {
            _patients.Remove(existing);
            _patients.Add(patient);
        }
        return Task.CompletedTask;
    }
}
