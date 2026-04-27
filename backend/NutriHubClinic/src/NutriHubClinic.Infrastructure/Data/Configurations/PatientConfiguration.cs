using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Infrastructure.Data.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.ToTable("Patients");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                .ValueGeneratedNever();

            builder.Property(p => p.NutritionistId)
                .IsRequired();

            builder.Property(p => p.CreatedAt)
                .IsRequired();

            builder.HasOne(p => p.Nutritionist)
                .WithMany()
                .HasForeignKey(p => p.NutritionistId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(p => p.NutritionistId);
        }
    }
}
