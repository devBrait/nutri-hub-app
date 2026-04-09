using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Tests.Fakes;

internal sealed class FakePatientRepository : IPatientRepository
{
    private readonly List<Patient> _patients;
    private readonly bool _shouldThrow;

    public List<Patient> UpdatedPatients { get; } = [];

    public FakePatientRepository(IEnumerable<Patient>? patients = null, bool shouldThrow = false)
    {
        _patients = [.. (patients ?? [])];
        _shouldThrow = shouldThrow;
    }

    public Task<Patient?> GetByIdAsync(Guid id)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        var patient = _patients.FirstOrDefault(p => p.Id == id);
        return Task.FromResult(patient);
    }

    public Task UpdateAsync(Patient patient)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        UpdatedPatients.Add(patient);
        return Task.CompletedTask;
    }
}
