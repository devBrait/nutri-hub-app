using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NutriHubPatient.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InternalFoodDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "FoodId",
                schema: "nutri_patient",
                table: "MealItems",
                type: "integer",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "ProteinPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(6,2)",
                oldPrecision: 6,
                oldScale: 2);

            migrationBuilder.AlterColumn<double>(
                name: "FatPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(6,2)",
                oldPrecision: 6,
                oldScale: 2);

            migrationBuilder.AlterColumn<double>(
                name: "CarbsPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(6,2)",
                oldPrecision: 6,
                oldScale: 2);

            migrationBuilder.AlterColumn<double>(
                name: "CaloriesPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(7,2)",
                oldPrecision: 7,
                oldScale: 2);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                schema: "nutri_patient",
                table: "Foods",
                type: "integer",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.InsertData(
                schema: "nutri_patient",
                table: "Foods",
                columns: new[] { "Id", "CaloriesPer100g", "CarbsPer100g", "CreatedAt", "CreatedByPatientId", "FatPer100g", "IsCustom", "Name", "ProteinPer100g" },
                values: new object[,]
                {
                    { 1, 130.0, 28.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Arroz Branco Cozido", 2.7000000000000002 },
                    { 2, 77.0, 14.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Feijão Cozido", 5.0 },
                    { 3, 165.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.6000000000000001, false, "Frango Grelhado", 31.0 },
                    { 4, 143.0, 0.69999999999999996, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 10.0, false, "Ovo Inteiro", 13.0 },
                    { 5, 89.0, 23.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Banana", 1.1000000000000001 },
                    { 6, 52.0, 14.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Maçã", 0.29999999999999999 },
                    { 7, 300.0, 57.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.5, false, "Pão Francês", 9.0 },
                    { 8, 61.0, 4.7999999999999998, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.2999999999999998, false, "Leite Integral", 3.2000000000000002 },
                    { 9, 163.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 5.2000000000000002, false, "Carne Bovina Patinho", 28.0 },
                    { 10, 87.0, 20.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Batata Inglesa Cozida", 1.8999999999999999 },
                    { 11, 86.0, 20.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Batata Doce Cozida", 1.6000000000000001 },
                    { 12, 15.0, 2.8999999999999999, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Alface", 1.3999999999999999 },
                    { 13, 18.0, 3.8999999999999999, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Tomate", 0.90000000000000002 },
                    { 14, 41.0, 10.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Cenoura", 0.90000000000000002 },
                    { 15, 55.0, 11.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.59999999999999998, false, "Brócolis Cozido", 3.7000000000000002 },
                    { 16, 389.0, 66.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 7.0, false, "Aveia", 17.0 },
                    { 17, 59.0, 3.6000000000000001, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.40000000000000002, false, "Iogurte Natural Desnatado", 10.0 },
                    { 18, 280.0, 2.2000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Queijo Mussarela", 22.0 },
                    { 19, 208.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 13.0, false, "Salmão", 20.0 },
                    { 20, 132.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 2.0, false, "Atum em Lata", 28.0 },
                    { 21, 717.0, 0.10000000000000001, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 81.0, false, "Manteiga", 0.90000000000000002 },
                    { 22, 884.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 100.0, false, "Azeite de Oliva", 0.0 },
                    { 23, 47.0, 12.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Laranja", 0.90000000000000002 },
                    { 24, 32.0, 7.7000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Morango", 0.69999999999999996 },
                    { 25, 69.0, 18.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Uva", 0.69999999999999996 },
                    { 26, 43.0, 11.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Mamão", 0.5 },
                    { 27, 50.0, 13.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Abacaxi", 0.5 },
                    { 28, 60.0, 15.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.40000000000000002, false, "Manga", 0.80000000000000004 },
                    { 29, 28.0, 4.4000000000000004, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Couve Cozida", 2.2000000000000002 },
                    { 30, 23.0, 3.7999999999999998, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Espinafre Cozido", 2.8999999999999999 },
                    { 31, 40.0, 9.3000000000000007, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Cebola", 1.1000000000000001 },
                    { 32, 149.0, 33.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Alho", 6.4000000000000004 },
                    { 33, 158.0, 31.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.90000000000000002, false, "Macarrão Cozido", 5.7999999999999998 },
                    { 34, 265.0, 49.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.5, false, "Pão Integral", 9.0 },
                    { 35, 428.0, 66.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 14.0, false, "Biscoito Cream Cracker", 10.0 },
                    { 36, 567.0, 16.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 49.0, false, "Amendoim", 26.0 },
                    { 37, 553.0, 30.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 44.0, false, "Castanha de Caju", 18.0 },
                    { 38, 579.0, 22.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 50.0, false, "Amêndoa", 21.0 },
                    { 39, 535.0, 60.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 30.0, false, "Chocolate ao Leite", 8.0 },
                    { 40, 304.0, 82.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.0, false, "Mel", 0.29999999999999999 },
                    { 41, 387.0, 100.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.0, false, "Açúcar Refinado", 0.0 },
                    { 42, 207.0, 24.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 11.0, false, "Sorvete de Baunilha", 3.5 },
                    { 43, 266.0, 33.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 10.0, false, "Pizza de Queijo", 12.0 },
                    { 44, 250.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Hambúrguer Bovino", 17.0 },
                    { 45, 128.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 2.7000000000000002, false, "Tilápia Grelhada", 26.0 },
                    { 46, 99.0, 0.90000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Camarão Cozido", 24.0 },
                    { 47, 160.0, 9.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 15.0, false, "Abacate", 2.0 },
                    { 48, 188.0, 3.7000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 18.0, false, "Creme de Leite", 2.7000000000000002 },
                    { 49, 370.0, 6.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 5.0, false, "Whey Protein", 75.0 },
                    { 50, 471.0, 64.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Granola", 10.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 40);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 41);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 42);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 43);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 44);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 45);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 46);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 47);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 48);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 49);

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: 50);

            migrationBuilder.AlterColumn<Guid>(
                name: "FoodId",
                schema: "nutri_patient",
                table: "MealItems",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "ProteinPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "numeric(6,2)",
                precision: 6,
                scale: 2,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<decimal>(
                name: "FatPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "numeric(6,2)",
                precision: 6,
                scale: 2,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<decimal>(
                name: "CarbsPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "numeric(6,2)",
                precision: 6,
                scale: 2,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<decimal>(
                name: "CaloriesPer100g",
                schema: "nutri_patient",
                table: "Foods",
                type: "numeric(7,2)",
                precision: 7,
                scale: 2,
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                schema: "nutri_patient",
                table: "Foods",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);
        }
    }
}
