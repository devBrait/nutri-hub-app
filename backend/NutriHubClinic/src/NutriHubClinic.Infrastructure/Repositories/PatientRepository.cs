using NutriHubClinic.Domain.Entities;
using NutriHubClinic.Domain.Interfaces;

namespace NutriHubClinic.Infrastructure.Repositories
{
    // Simulação do repositório, futuramente deve ser substituído por integração com banco de dados
    public class PatientRepository : IPatientRepository
    {
        private static readonly HashSet<Guid> _nutritionists =
        [
            Guid.Parse("00000000-0000-0000-0000-000000000001"),
            Guid.Parse("00000000-0000-0000-0000-000000000002"),
            Guid.Parse("00000000-0000-0000-0000-000000000003")
        ];

        private static readonly List<Patient> _patients =
        [
            new Patient("João Silva", "joao@email.com", Guid.Parse("00000000-0000-0000-0000-000000000001")),
            new Patient("Maria Santos", "maria@email.com", Guid.Parse("00000000-0000-0000-0000-000000000001")),
            new Patient("Carlos Oliveira", "carlos@email.com", Guid.Parse("00000000-0000-0000-0000-000000000002")),
        ];

        public Task<bool> NutritionistExistsAsync(Guid nutritionistId)
        {
            return Task.FromResult(_nutritionists.Contains(nutritionistId));
        }

        public Task<IEnumerable<Patient>> GetByNutritionistIdAsync(Guid nutritionistId)
        {
            var patients = _patients.Where(p => p.NutritionistId == nutritionistId);
            return Task.FromResult(patients);
        }
    }
}
