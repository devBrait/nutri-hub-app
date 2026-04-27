using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class MealConfiguration : IEntityTypeConfiguration<Meal>
    {
        public void Configure(EntityTypeBuilder<Meal> builder)
        {
            builder.ToTable("Meals");

            builder.HasKey(m => m.Id);

            builder.Property(m => m.MealType)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(20);

            builder.Property(m => m.CustomName)
                .HasMaxLength(100);

            builder.Property(m => m.TotalCalories)
                .IsRequired()
                .HasPrecision(7, 2);

            builder.Property(m => m.TotalCarbsG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(m => m.TotalProteinG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(m => m.TotalFatG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(m => m.CreatedAt)
                .IsRequired();

            builder.HasOne<DailySummary>()
                .WithMany(d => d.Meals)
                .HasForeignKey(m => m.DailySummaryId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(m => m.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(m => m.DailySummaryId);
        }
    }
}
