using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubPatient.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPatientTrackingSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WeightKg",
                schema: "nutri_patient",
                table: "patients");

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                schema: "nutri_patient",
                table: "patients",
                type: "character varying(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DailySummaries",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    WaterMl = table.Column<int>(type: "integer", nullable: false),
                    TotalCalories = table.Column<decimal>(type: "numeric(7,2)", precision: 7, scale: 2, nullable: false),
                    CalorieGoal = table.Column<int>(type: "integer", nullable: false),
                    TotalCarbsG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    TotalProteinG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    TotalFatG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailySummaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DailySummaries_patients_PatientId",
                        column: x => x.PatientId,
                        principalSchema: "nutri_patient",
                        principalTable: "patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Foods",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CaloriesPer100g = table.Column<decimal>(type: "numeric(7,2)", precision: 7, scale: 2, nullable: false),
                    CarbsPer100g = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    ProteinPer100g = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    FatPer100g = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    IsCustom = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedByPatientId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Foods_patients_CreatedByPatientId",
                        column: x => x.CreatedByPatientId,
                        principalSchema: "nutri_patient",
                        principalTable: "patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "PatientGoals",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    Objective = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    ActivityLevel = table.Column<string>(type: "character varying(25)", maxLength: 25, nullable: false),
                    TargetWeightKg = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    DailyCalorieGoal = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientGoals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientGoals_patients_PatientId",
                        column: x => x.PatientId,
                        principalSchema: "nutri_patient",
                        principalTable: "patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeightHistories",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    WeightKg = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false),
                    RecordedAt = table.Column<DateOnly>(type: "date", nullable: false),
                    Notes = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeightHistories_patients_PatientId",
                        column: x => x.PatientId,
                        principalSchema: "nutri_patient",
                        principalTable: "patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Meals",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DailySummaryId = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    MealType = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    CustomName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EatenAt = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    TotalCalories = table.Column<decimal>(type: "numeric(7,2)", precision: 7, scale: 2, nullable: false),
                    TotalCarbsG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    TotalProteinG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    TotalFatG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Meals_DailySummaries_DailySummaryId",
                        column: x => x.DailySummaryId,
                        principalSchema: "nutri_patient",
                        principalTable: "DailySummaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Meals_patients_PatientId",
                        column: x => x.PatientId,
                        principalSchema: "nutri_patient",
                        principalTable: "patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MealItems",
                schema: "nutri_patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MealId = table.Column<Guid>(type: "uuid", nullable: false),
                    FoodId = table.Column<Guid>(type: "uuid", nullable: true),
                    FoodName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    QuantityG = table.Column<decimal>(type: "numeric(7,2)", precision: 7, scale: 2, nullable: false),
                    Calories = table.Column<decimal>(type: "numeric(7,2)", precision: 7, scale: 2, nullable: false),
                    CarbsG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    ProteinG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    FatG = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MealItems_Foods_FoodId",
                        column: x => x.FoodId,
                        principalSchema: "nutri_patient",
                        principalTable: "Foods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_MealItems_Meals_MealId",
                        column: x => x.MealId,
                        principalSchema: "nutri_patient",
                        principalTable: "Meals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailySummaries_PatientId_Date",
                schema: "nutri_patient",
                table: "DailySummaries",
                columns: new[] { "PatientId", "Date" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Foods_CreatedByPatientId",
                schema: "nutri_patient",
                table: "Foods",
                column: "CreatedByPatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Foods_Name",
                schema: "nutri_patient",
                table: "Foods",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_MealItems_FoodId",
                schema: "nutri_patient",
                table: "MealItems",
                column: "FoodId");

            migrationBuilder.CreateIndex(
                name: "IX_MealItems_MealId",
                schema: "nutri_patient",
                table: "MealItems",
                column: "MealId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_DailySummaryId",
                schema: "nutri_patient",
                table: "Meals",
                column: "DailySummaryId");

            migrationBuilder.CreateIndex(
                name: "IX_Meals_PatientId",
                schema: "nutri_patient",
                table: "Meals",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientGoals_PatientId",
                schema: "nutri_patient",
                table: "PatientGoals",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_WeightHistories_PatientId_RecordedAt",
                schema: "nutri_patient",
                table: "WeightHistories",
                columns: new[] { "PatientId", "RecordedAt" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealItems",
                schema: "nutri_patient");

            migrationBuilder.DropTable(
                name: "PatientGoals",
                schema: "nutri_patient");

            migrationBuilder.DropTable(
                name: "WeightHistories",
                schema: "nutri_patient");

            migrationBuilder.DropTable(
                name: "Foods",
                schema: "nutri_patient");

            migrationBuilder.DropTable(
                name: "Meals",
                schema: "nutri_patient");

            migrationBuilder.DropTable(
                name: "DailySummaries",
                schema: "nutri_patient");

            migrationBuilder.DropColumn(
                name: "Sex",
                schema: "nutri_patient",
                table: "patients");

            migrationBuilder.AddColumn<decimal>(
                name: "WeightKg",
                schema: "nutri_patient",
                table: "patients",
                type: "numeric(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);
        }
    }
}
