using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class DailySummaryConfiguration : IEntityTypeConfiguration<DailySummary>
    {
        public void Configure(EntityTypeBuilder<DailySummary> builder)
        {
            builder.ToTable("DailySummaries");

            builder.HasKey(d => d.Id);

            builder.Property(d => d.Date)
                .IsRequired();

            builder.Property(d => d.WaterMl)
                .IsRequired();

            builder.Property(d => d.TotalCalories)
                .IsRequired()
                .HasPrecision(7, 2);

            builder.Property(d => d.CalorieGoal)
                .IsRequired();

            builder.Property(d => d.TotalCarbsG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(d => d.TotalProteinG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(d => d.TotalFatG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(d => d.CreatedAt)
                .IsRequired();

            builder.Property(d => d.UpdatedAt)
                .IsRequired();

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(d => d.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(d => new { d.PatientId, d.Date })
                .IsUnique();
        }
    }
}
