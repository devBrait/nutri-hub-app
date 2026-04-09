using NutriHubPatient.Domain.Entities;
using NutriHubPatient.Domain.Interfaces;

namespace NutriHubPatient.Infrastructure.Repositories
{
    // Simulação do repositório, futuramente deve ser substituído por integração com banco de dados
    public class PatientRepository : IPatientRepository
    {
        private static readonly List<Patient> _patients =
        [
            new Patient(Guid.Parse("00000000-0000-0000-0000-000000000001"), "João Silva", "joao@email.com"),
            new Patient(Guid.Parse("00000000-0000-0000-0000-000000000002"), "Maria Santos", "maria@email.com"),
        ];

        public Task<Patient?> GetByIdAsync(Guid id)
        {
            var patient = _patients.FirstOrDefault(p => p.Id == id);
            return Task.FromResult(patient);
        }

        public Task UpdateAsync(Patient patient)
        {
            var index = _patients.FindIndex(p => p.Id == patient.Id);
            if (index >= 0)
                _patients[index] = patient;

            return Task.CompletedTask;
        }
    }
}
