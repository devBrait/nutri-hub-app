using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Tests.Fakes;

internal sealed class FakePatientRepository : IPatientRepository
{
    private readonly List<Patient> _patients;
    private readonly bool _shouldThrow;

    public List<Patient> CreatedPatients { get; } = [];
    public List<Patient> UpdatedPatients { get; } = [];
    public List<Patient> OnboardedPatients { get; } = [];

    public FakePatientRepository(IEnumerable<Patient>? patients = null, bool shouldThrow = false)
    {
        _patients = [.. (patients ?? [])];
        _shouldThrow = shouldThrow;
    }

    public Task<Patient?> GetByIdAsync(Guid id)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.FromResult(_patients.FirstOrDefault(p => p.Id == id));
    }

    public Task<bool> ExistsAsync(Guid id)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.FromResult(_patients.Any(p => p.Id == id));
    }

    public Task CreateAsync(Patient patient)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        _patients.Add(patient);
        CreatedPatients.Add(patient);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(Patient patient)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        UpdatedPatients.Add(patient);
        return Task.CompletedTask;
    }

    public Task SaveOnboardingAsync(Patient patient, WeightHistory weightHistory, PatientGoal patientGoal)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        OnboardedPatients.Add(patient);
        return Task.CompletedTask;
    }

    public Task AddWeightAsync(WeightHistory weightHistory)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.CompletedTask;
    }

    public Task<IEnumerable<WeightHistory>> GetWeightHistoryAsync(Guid patientId)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        return Task.FromResult<IEnumerable<WeightHistory>>([]);
    }

    public Task UpdateProfileAsync(Patient patient, PatientGoal newGoal)
    {
        if (_shouldThrow) throw new Exception("Simulated database error.");
        UpdatedPatients.Add(patient);
        return Task.CompletedTask;
    }
}
