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

            builder.Property(f => f.Id)
                .ValueGeneratedNever();

            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(f => f.CaloriesPer100g).IsRequired();
            builder.Property(f => f.CarbsPer100g).IsRequired();
            builder.Property(f => f.ProteinPer100g).IsRequired();
            builder.Property(f => f.FatPer100g).IsRequired();
            builder.Property(f => f.IsCustom).IsRequired();
            builder.Property(f => f.CreatedAt).IsRequired();

            builder.HasOne<Patient>()
                .WithMany()
                .HasForeignKey(f => f.CreatedByPatientId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            builder.HasIndex(f => f.Name);

            builder.HasData(Seed());
        }

        private static Food[] Seed() =>
        [
            new(new Guid("00000000-0000-0000-0000-000000000001"), "Arroz Branco Cozido",       130,  28.0,  2.7,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000002"), "Feijão Cozido",               77,  14.0,  5.0,  0.5),
            new(new Guid("00000000-0000-0000-0000-000000000003"), "Frango Grelhado",            165,   0.0, 31.0,  3.6),
            new(new Guid("00000000-0000-0000-0000-000000000004"), "Ovo Inteiro",                143,   0.7, 13.0, 10.0),
            new(new Guid("00000000-0000-0000-0000-000000000005"), "Banana",                      89,  23.0,  1.1,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000006"), "Maçã",                        52,  14.0,  0.3,  0.2),
            new(new Guid("00000000-0000-0000-0000-000000000007"), "Pão Francês",                300,  57.0,  9.0,  3.5),
            new(new Guid("00000000-0000-0000-0000-000000000008"), "Leite Integral",              61,   4.8,  3.2,  3.3),
            new(new Guid("00000000-0000-0000-0000-000000000009"), "Carne Bovina Patinho",       163,   0.0, 28.0,  5.2),
            new(new Guid("00000000-0000-0000-0000-000000000010"), "Batata Inglesa Cozida",       87,  20.0,  1.9,  0.1),
            new(new Guid("00000000-0000-0000-0000-000000000011"), "Batata Doce Cozida",          86,  20.0,  1.6,  0.1),
            new(new Guid("00000000-0000-0000-0000-000000000012"), "Alface",                      15,   2.9,  1.4,  0.2),
            new(new Guid("00000000-0000-0000-0000-000000000013"), "Tomate",                      18,   3.9,  0.9,  0.2),
            new(new Guid("00000000-0000-0000-0000-000000000014"), "Cenoura",                     41,  10.0,  0.9,  0.2),
            new(new Guid("00000000-0000-0000-0000-000000000015"), "Brócolis Cozido",             55,  11.0,  3.7,  0.6),
            new(new Guid("00000000-0000-0000-0000-000000000016"), "Aveia",                      389,  66.0, 17.0,  7.0),
            new(new Guid("00000000-0000-0000-0000-000000000017"), "Iogurte Natural Desnatado",   59,   3.6, 10.0,  0.4),
            new(new Guid("00000000-0000-0000-0000-000000000018"), "Queijo Mussarela",           280,   2.2, 22.0, 20.0),
            new(new Guid("00000000-0000-0000-0000-000000000019"), "Salmão",                     208,   0.0, 20.0, 13.0),
            new(new Guid("00000000-0000-0000-0000-000000000020"), "Atum em Lata",               132,   0.0, 28.0,  2.0),
            new(new Guid("00000000-0000-0000-0000-000000000021"), "Manteiga",                   717,   0.1,  0.9, 81.0),
            new(new Guid("00000000-0000-0000-0000-000000000022"), "Azeite de Oliva",            884,   0.0,  0.0,100.0),
            new(new Guid("00000000-0000-0000-0000-000000000023"), "Laranja",                     47,  12.0,  0.9,  0.1),
            new(new Guid("00000000-0000-0000-0000-000000000024"), "Morango",                     32,   7.7,  0.7,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000025"), "Uva",                         69,  18.0,  0.7,  0.2),
            new(new Guid("00000000-0000-0000-0000-000000000026"), "Mamão",                       43,  11.0,  0.5,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000027"), "Abacaxi",                     50,  13.0,  0.5,  0.1),
            new(new Guid("00000000-0000-0000-0000-000000000028"), "Manga",                       60,  15.0,  0.8,  0.4),
            new(new Guid("00000000-0000-0000-0000-000000000029"), "Couve Cozida",                28,   4.4,  2.2,  0.5),
            new(new Guid("00000000-0000-0000-0000-000000000030"), "Espinafre Cozido",            23,   3.8,  2.9,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000031"), "Cebola",                      40,   9.3,  1.1,  0.1),
            new(new Guid("00000000-0000-0000-0000-000000000032"), "Alho",                       149,  33.0,  6.4,  0.5),
            new(new Guid("00000000-0000-0000-0000-000000000033"), "Macarrão Cozido",            158,  31.0,  5.8,  0.9),
            new(new Guid("00000000-0000-0000-0000-000000000034"), "Pão Integral",               265,  49.0,  9.0,  3.5),
            new(new Guid("00000000-0000-0000-0000-000000000035"), "Biscoito Cream Cracker",     428,  66.0, 10.0, 14.0),
            new(new Guid("00000000-0000-0000-0000-000000000036"), "Amendoim",                   567,  16.0, 26.0, 49.0),
            new(new Guid("00000000-0000-0000-0000-000000000037"), "Castanha de Caju",           553,  30.0, 18.0, 44.0),
            new(new Guid("00000000-0000-0000-0000-000000000038"), "Amêndoa",                    579,  22.0, 21.0, 50.0),
            new(new Guid("00000000-0000-0000-0000-000000000039"), "Chocolate ao Leite",         535,  60.0,  8.0, 30.0),
            new(new Guid("00000000-0000-0000-0000-000000000040"), "Mel",                        304,  82.0,  0.3,  0.0),
            new(new Guid("00000000-0000-0000-0000-000000000041"), "Açúcar Refinado",            387, 100.0,  0.0,  0.0),
            new(new Guid("00000000-0000-0000-0000-000000000042"), "Sorvete de Baunilha",        207,  24.0,  3.5, 11.0),
            new(new Guid("00000000-0000-0000-0000-000000000043"), "Pizza de Queijo",            266,  33.0, 12.0, 10.0),
            new(new Guid("00000000-0000-0000-0000-000000000044"), "Hambúrguer Bovino",          250,   0.0, 17.0, 20.0),
            new(new Guid("00000000-0000-0000-0000-000000000045"), "Tilápia Grelhada",           128,   0.0, 26.0,  2.7),
            new(new Guid("00000000-0000-0000-0000-000000000046"), "Camarão Cozido",              99,   0.9, 24.0,  0.3),
            new(new Guid("00000000-0000-0000-0000-000000000047"), "Abacate",                    160,   9.0,  2.0, 15.0),
            new(new Guid("00000000-0000-0000-0000-000000000048"), "Creme de Leite",             188,   3.7,  2.7, 18.0),
            new(new Guid("00000000-0000-0000-0000-000000000049"), "Whey Protein",               370,   6.0, 75.0,  5.0),
            new(new Guid("00000000-0000-0000-0000-000000000050"), "Granola",                    471,  64.0, 10.0, 20.0),
        ];
    }
}
