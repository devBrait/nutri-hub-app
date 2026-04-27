using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Domain.Entities;
using System.Reflection;

namespace NutriHubPatient.Infrastructure.Data
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions<PatientDbContext> options) : base(options) { }

        public DbSet<Patient> Patients => Set<Patient>();
        public DbSet<PatientGoal> PatientGoals => Set<PatientGoal>();
        public DbSet<WeightHistory> WeightHistories => Set<WeightHistory>();
        public DbSet<DailySummary> DailySummaries => Set<DailySummary>();
        public DbSet<Meal> Meals => Set<Meal>();
        public DbSet<MealItem> MealItems => Set<MealItem>();
        public DbSet<Food> Foods => Set<Food>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("nutri_patient");
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
