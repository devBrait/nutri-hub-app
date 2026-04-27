using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class WeightHistoryConfiguration : IEntityTypeConfiguration<WeightHistory>
    {
        public void Configure(EntityTypeBuilder<WeightHistory> builder)
        {
            builder.ToTable("WeightHistories");

            builder.HasKey(w => w.Id);

            builder.Property(w => w.WeightKg)
                .IsRequired()
                .HasPrecision(5, 2);

            builder.Property(w => w.RecordedAt)
                .IsRequired();

            builder.Property(w => w.Notes)
                .HasMaxLength(500);

            builder.Property(w => w.CreatedAt)
                .IsRequired();

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(w => w.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(w => new { w.PatientId, w.RecordedAt });
        }
    }
}
