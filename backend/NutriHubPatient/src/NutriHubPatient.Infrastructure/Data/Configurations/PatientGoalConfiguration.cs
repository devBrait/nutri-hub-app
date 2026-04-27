using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class PatientGoalConfiguration : IEntityTypeConfiguration<PatientGoal>
    {
        public void Configure(EntityTypeBuilder<PatientGoal> builder)
        {
            builder.ToTable("PatientGoals");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.Objective)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(20);

            builder.Property(g => g.ActivityLevel)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(25);

            builder.Property(g => g.TargetWeightKg)
                .IsRequired()
                .HasPrecision(5, 2);

            builder.Property(g => g.DailyCalorieGoal)
                .IsRequired();

            builder.Property(g => g.IsActive)
                .IsRequired();

            builder.Property(g => g.CreatedAt)
                .IsRequired();

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(g => g.PatientId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
