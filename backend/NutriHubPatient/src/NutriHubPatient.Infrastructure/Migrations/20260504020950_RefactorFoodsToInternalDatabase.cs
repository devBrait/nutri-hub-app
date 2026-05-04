using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NutriHubPatient.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RefactorFoodsToInternalDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.InsertData(
                schema: "nutri_patient",
                table: "Foods",
                columns: new[] { "Id", "CaloriesPer100g", "CarbsPer100g", "CreatedAt", "CreatedByPatientId", "FatPer100g", "IsCustom", "Name", "ProteinPer100g" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), 130.0, 28.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Arroz Branco Cozido", 2.7000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000002"), 77.0, 14.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Feijão Cozido", 5.0 },
                    { new Guid("00000000-0000-0000-0000-000000000003"), 165.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.6000000000000001, false, "Frango Grelhado", 31.0 },
                    { new Guid("00000000-0000-0000-0000-000000000004"), 143.0, 0.69999999999999996, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 10.0, false, "Ovo Inteiro", 13.0 },
                    { new Guid("00000000-0000-0000-0000-000000000005"), 89.0, 23.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Banana", 1.1000000000000001 },
                    { new Guid("00000000-0000-0000-0000-000000000006"), 52.0, 14.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Maçã", 0.29999999999999999 },
                    { new Guid("00000000-0000-0000-0000-000000000007"), 300.0, 57.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.5, false, "Pão Francês", 9.0 },
                    { new Guid("00000000-0000-0000-0000-000000000008"), 61.0, 4.7999999999999998, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.2999999999999998, false, "Leite Integral", 3.2000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000009"), 163.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 5.2000000000000002, false, "Carne Bovina Patinho", 28.0 },
                    { new Guid("00000000-0000-0000-0000-000000000010"), 87.0, 20.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Batata Inglesa Cozida", 1.8999999999999999 },
                    { new Guid("00000000-0000-0000-0000-000000000011"), 86.0, 20.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Batata Doce Cozida", 1.6000000000000001 },
                    { new Guid("00000000-0000-0000-0000-000000000012"), 15.0, 2.8999999999999999, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Alface", 1.3999999999999999 },
                    { new Guid("00000000-0000-0000-0000-000000000013"), 18.0, 3.8999999999999999, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Tomate", 0.90000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000014"), 41.0, 10.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Cenoura", 0.90000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000015"), 55.0, 11.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.59999999999999998, false, "Brócolis Cozido", 3.7000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000016"), 389.0, 66.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 7.0, false, "Aveia", 17.0 },
                    { new Guid("00000000-0000-0000-0000-000000000017"), 59.0, 3.6000000000000001, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.40000000000000002, false, "Iogurte Natural Desnatado", 10.0 },
                    { new Guid("00000000-0000-0000-0000-000000000018"), 280.0, 2.2000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Queijo Mussarela", 22.0 },
                    { new Guid("00000000-0000-0000-0000-000000000019"), 208.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 13.0, false, "Salmão", 20.0 },
                    { new Guid("00000000-0000-0000-0000-000000000020"), 132.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 2.0, false, "Atum em Lata", 28.0 },
                    { new Guid("00000000-0000-0000-0000-000000000021"), 717.0, 0.10000000000000001, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 81.0, false, "Manteiga", 0.90000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000022"), 884.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 100.0, false, "Azeite de Oliva", 0.0 },
                    { new Guid("00000000-0000-0000-0000-000000000023"), 47.0, 12.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Laranja", 0.90000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000024"), 32.0, 7.7000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Morango", 0.69999999999999996 },
                    { new Guid("00000000-0000-0000-0000-000000000025"), 69.0, 18.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.20000000000000001, false, "Uva", 0.69999999999999996 },
                    { new Guid("00000000-0000-0000-0000-000000000026"), 43.0, 11.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Mamão", 0.5 },
                    { new Guid("00000000-0000-0000-0000-000000000027"), 50.0, 13.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Abacaxi", 0.5 },
                    { new Guid("00000000-0000-0000-0000-000000000028"), 60.0, 15.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.40000000000000002, false, "Manga", 0.80000000000000004 },
                    { new Guid("00000000-0000-0000-0000-000000000029"), 28.0, 4.4000000000000004, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Couve Cozida", 2.2000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000030"), 23.0, 3.7999999999999998, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Espinafre Cozido", 2.8999999999999999 },
                    { new Guid("00000000-0000-0000-0000-000000000031"), 40.0, 9.3000000000000007, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.10000000000000001, false, "Cebola", 1.1000000000000001 },
                    { new Guid("00000000-0000-0000-0000-000000000032"), 149.0, 33.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.5, false, "Alho", 6.4000000000000004 },
                    { new Guid("00000000-0000-0000-0000-000000000033"), 158.0, 31.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.90000000000000002, false, "Macarrão Cozido", 5.7999999999999998 },
                    { new Guid("00000000-0000-0000-0000-000000000034"), 265.0, 49.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 3.5, false, "Pão Integral", 9.0 },
                    { new Guid("00000000-0000-0000-0000-000000000035"), 428.0, 66.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 14.0, false, "Biscoito Cream Cracker", 10.0 },
                    { new Guid("00000000-0000-0000-0000-000000000036"), 567.0, 16.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 49.0, false, "Amendoim", 26.0 },
                    { new Guid("00000000-0000-0000-0000-000000000037"), 553.0, 30.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 44.0, false, "Castanha de Caju", 18.0 },
                    { new Guid("00000000-0000-0000-0000-000000000038"), 579.0, 22.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 50.0, false, "Amêndoa", 21.0 },
                    { new Guid("00000000-0000-0000-0000-000000000039"), 535.0, 60.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 30.0, false, "Chocolate ao Leite", 8.0 },
                    { new Guid("00000000-0000-0000-0000-000000000040"), 304.0, 82.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.0, false, "Mel", 0.29999999999999999 },
                    { new Guid("00000000-0000-0000-0000-000000000041"), 387.0, 100.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.0, false, "Açúcar Refinado", 0.0 },
                    { new Guid("00000000-0000-0000-0000-000000000042"), 207.0, 24.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 11.0, false, "Sorvete de Baunilha", 3.5 },
                    { new Guid("00000000-0000-0000-0000-000000000043"), 266.0, 33.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 10.0, false, "Pizza de Queijo", 12.0 },
                    { new Guid("00000000-0000-0000-0000-000000000044"), 250.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Hambúrguer Bovino", 17.0 },
                    { new Guid("00000000-0000-0000-0000-000000000045"), 128.0, 0.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 2.7000000000000002, false, "Tilápia Grelhada", 26.0 },
                    { new Guid("00000000-0000-0000-0000-000000000046"), 99.0, 0.90000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 0.29999999999999999, false, "Camarão Cozido", 24.0 },
                    { new Guid("00000000-0000-0000-0000-000000000047"), 160.0, 9.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 15.0, false, "Abacate", 2.0 },
                    { new Guid("00000000-0000-0000-0000-000000000048"), 188.0, 3.7000000000000002, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 18.0, false, "Creme de Leite", 2.7000000000000002 },
                    { new Guid("00000000-0000-0000-0000-000000000049"), 370.0, 6.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 5.0, false, "Whey Protein", 75.0 },
                    { new Guid("00000000-0000-0000-0000-000000000050"), 471.0, 64.0, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), null, 20.0, false, "Granola", 10.0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000007"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000008"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000009"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000010"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000011"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000012"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000013"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000014"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000015"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000016"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000017"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000018"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000019"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000020"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000021"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000022"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000023"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000024"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000025"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000026"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000027"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000028"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000029"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000030"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000031"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000032"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000033"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000034"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000035"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000036"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000037"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000038"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000039"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000040"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000041"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000042"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000043"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000044"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000045"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000046"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000047"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000048"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000049"));

            migrationBuilder.DeleteData(
                schema: "nutri_patient",
                table: "Foods",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000050"));

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
        }
    }
}
