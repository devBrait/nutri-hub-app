using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NutriHubPatient.Domain.Entities;

namespace NutriHubPatient.Infrastructure.Data.Configurations
{
    public class MealItemConfiguration : IEntityTypeConfiguration<MealItem>
    {
        public void Configure(EntityTypeBuilder<MealItem> builder)
        {
            builder.ToTable("MealItems");

            builder.HasKey(i => i.Id);

            builder.Property(i => i.FoodName)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(i => i.QuantityG)
                .IsRequired()
                .HasPrecision(7, 2);

            builder.Property(i => i.Calories)
                .IsRequired()
                .HasPrecision(7, 2);

            builder.Property(i => i.CarbsG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(i => i.ProteinG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(i => i.FatG)
                .IsRequired()
                .HasPrecision(6, 2);

            builder.Property(i => i.CreatedAt)
                .IsRequired();

            builder.HasOne<Meal>()
                .WithMany(m => m.Items)
                .HasForeignKey(i => i.MealId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Food>()
                .WithMany()
                .HasForeignKey(i => i.FoodId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            builder.Property(i => i.FoodId).IsRequired(false);

            builder.HasIndex(i => i.MealId);
        }
    }
}
