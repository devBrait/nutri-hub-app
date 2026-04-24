using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Infrastructure.Data.Configurations
{
    public class PatientConfiguration : IEntityTypeConfiguration<Patient>
    {
        public void Configure(EntityTypeBuilder<Patient> builder)
        {
            builder.ToTable("patients");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                .ValueGeneratedNever();

            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(p => p.NutritionistId)
                .IsRequired();

            builder.Property(p => p.CreatedAt)
                .IsRequired();

            builder.HasOne(p => p.Nutritionist)
                .WithMany()
                .HasForeignKey(p => p.NutritionistId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
