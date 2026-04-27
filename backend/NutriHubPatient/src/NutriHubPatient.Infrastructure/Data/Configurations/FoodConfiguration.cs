using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class FoodConfiguration : IEntityTypeConfiguration<Food>
    {
        public void Configure(EntityTypeBuilder<Food> builder)
        {
            builder.ToTable("Foods");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(f => f.CaloriesPer100g)
                .IsRequired()
                .HasPrecision(7, 2);

            builder.Property(f => f.CarbsPer100g)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(f => f.ProteinPer100g)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(f => f.FatPer100g)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(f => f.IsCustom)
                .IsRequired();

            builder.Property(f => f.CreatedAt)
                .IsRequired();

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(f => f.CreatedByPatientId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            builder.HasIndex(f => f.Name);
        }
    }
}
