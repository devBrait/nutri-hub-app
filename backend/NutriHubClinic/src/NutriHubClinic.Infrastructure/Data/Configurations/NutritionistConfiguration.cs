using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Infrastructure.Data.Configurations
{
    public class NutritionistConfiguration : IEntityTypeConfiguration<Nutritionist>
    {
        public void Configure(EntityTypeBuilder<Nutritionist> builder)
        {
            builder.ToTable("nutritionists");

            builder.HasKey(n => n.Id);

            builder.Property(n => n.Id)
                .ValueGeneratedNever();

            builder.Property(n => n.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(n => n.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(n => n.CreatedAt)
                .IsRequired();
        }
    }
}
