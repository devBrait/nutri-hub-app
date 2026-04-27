using NutriHubPatient.Domain.Enums;

namespace NutriHubPatient.Domain.Entities
{
    public class PatientGoal
    {
        public Guid Id { get; private set; }
        public Guid PatientId { get; private set; }
        public Objective Objective { get; private set; }
        public ActivityLevel ActivityLevel { get; private set; }
        public decimal TargetWeightKg { get; private set; }
        public int DailyCalorieGoal { get; private set; }
        public bool IsActive { get; private set; }
        public DateTime CreatedAt { get; private set; }

        protected PatientGoal() { }

        public PatientGoal(Guid patientId, Objective objective, ActivityLevel activityLevel, decimal targetWeightKg, int dailyCalorieGoal)
        {
            Id = Guid.NewGuid();
            PatientId = patientId;
            Objective = objective;
            ActivityLevel = activityLevel;
            TargetWeightKg = targetWeightKg;
            DailyCalorieGoal = dailyCalorieGoal;
            IsActive = true;
            CreatedAt = DateTime.UtcNow;
        }

        public void Deactivate() => IsActive = false;
    }
}
