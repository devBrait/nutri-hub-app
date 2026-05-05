using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubClinic.Domain.Entities;

namespace NutriHubClinic.Infrastructure.Data.Configurations
{
    public class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> builder)
        {
            builder.ToTable("Invitations");

            builder.HasKey(i => i.Id);

            builder.Property(i => i.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(i => i.Token)
                .IsRequired()
                .HasMaxLength(50);

            builder.HasIndex(i => i.Token)
                .IsUnique();

            builder.Property(i => i.NutritionistId)
                .IsRequired();

            builder.Property(i => i.ExpirationDate)
                .IsRequired();

            builder.Property(i => i.Status)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(i => i.CreatedAt)
                .IsRequired();

            builder.HasOne(i => i.Nutritionist)
                .WithMany()
                .HasForeignKey(i => i.NutritionistId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(i => new { i.Email, i.NutritionistId });
        }
    }
}
