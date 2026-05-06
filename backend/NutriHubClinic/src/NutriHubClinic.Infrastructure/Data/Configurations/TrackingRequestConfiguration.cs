using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Infrastructure.Data.Configurations
{
    public class TrackingRequestConfiguration : IEntityTypeConfiguration<TrackingRequest>
    {
        public void Configure(EntityTypeBuilder<TrackingRequest> builder)
        {
            builder.ToTable("TrackingRequests");
            builder.HasKey(r => r.Id);

            builder.Property(r => r.PatientId).IsRequired();
            builder.Property(r => r.PatientName).IsRequired().HasMaxLength(150);
            builder.Property(r => r.PatientEmail).IsRequired().HasMaxLength(255);
            builder.Property(r => r.NutritionistId).IsRequired();
            builder.Property(r => r.Status).HasConversion<string>().IsRequired();
            builder.Property(r => r.CreatedAt).IsRequired();

            builder.HasOne(r => r.Nutritionist)
                .WithMany()
                .HasForeignKey(r => r.NutritionistId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(r => new { r.PatientId, r.NutritionistId });
            builder.HasIndex(r => r.NutritionistId);
        }
    }
}
