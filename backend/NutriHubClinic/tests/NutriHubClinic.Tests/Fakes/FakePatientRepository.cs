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
}
