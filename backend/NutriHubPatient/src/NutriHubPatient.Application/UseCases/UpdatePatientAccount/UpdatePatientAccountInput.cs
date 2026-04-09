using System.Text.Json.Serialization;

namespace NutriHubPatient.Application.UseCases.UpdatePatientAccount
{
    public class UpdatePatientAccountInput
    {
        [JsonIgnore]
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
