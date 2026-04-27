using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubClinic.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNutritionistCrnAndRemovePatientData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_patients_nutritionists_NutritionistId",
                schema: "nutri_clinic",
                table: "patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_patients",
                schema: "nutri_clinic",
                table: "patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_nutritionists",
                schema: "nutri_clinic",
                table: "nutritionists");

            migrationBuilder.DropColumn(
                name: "Email",
                schema: "nutri_clinic",
                table: "patients");

            migrationBuilder.DropColumn(
                name: "Name",
                schema: "nutri_clinic",
                table: "patients");

            migrationBuilder.RenameTable(
                name: "patients",
                schema: "nutri_clinic",
                newName: "Patients",
                newSchema: "nutri_clinic");

            migrationBuilder.RenameTable(
                name: "nutritionists",
                schema: "nutri_clinic",
                newName: "Nutritionists",
                newSchema: "nutri_clinic");

            migrationBuilder.RenameIndex(
                name: "IX_patients_NutritionistId",
                schema: "nutri_clinic",
                table: "Patients",
                newName: "IX_Patients_NutritionistId");

            migrationBuilder.AddColumn<string>(
                name: "Crn",
                schema: "nutri_clinic",
                table: "Nutritionists",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                schema: "nutri_clinic",
                table: "Patients",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Nutritionists",
                schema: "nutri_clinic",
                table: "Nutritionists",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Nutritionists_Crn",
                schema: "nutri_clinic",
                table: "Nutritionists",
                column: "Crn",
                unique: true,
                filter: "\"Crn\" IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Nutritionists_Email",
                schema: "nutri_clinic",
                table: "Nutritionists",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                schema: "nutri_clinic",
                table: "Patients",
                column: "NutritionistId",
                principalSchema: "nutri_clinic",
                principalTable: "Nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Nutritionists_NutritionistId",
                schema: "nutri_clinic",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                schema: "nutri_clinic",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Nutritionists",
                schema: "nutri_clinic",
                table: "Nutritionists");

            migrationBuilder.DropIndex(
                name: "IX_Nutritionists_Crn",
                schema: "nutri_clinic",
                table: "Nutritionists");

            migrationBuilder.DropIndex(
                name: "IX_Nutritionists_Email",
                schema: "nutri_clinic",
                table: "Nutritionists");

            migrationBuilder.DropColumn(
                name: "Crn",
                schema: "nutri_clinic",
                table: "Nutritionists");

            migrationBuilder.RenameTable(
                name: "Patients",
                schema: "nutri_clinic",
                newName: "patients",
                newSchema: "nutri_clinic");

            migrationBuilder.RenameTable(
                name: "Nutritionists",
                schema: "nutri_clinic",
                newName: "nutritionists",
                newSchema: "nutri_clinic");

            migrationBuilder.RenameIndex(
                name: "IX_Patients_NutritionistId",
                schema: "nutri_clinic",
                table: "patients",
                newName: "IX_patients_NutritionistId");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "nutri_clinic",
                table: "patients",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "nutri_clinic",
                table: "patients",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_patients",
                schema: "nutri_clinic",
                table: "patients",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_nutritionists",
                schema: "nutri_clinic",
                table: "nutritionists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_patients_nutritionists_NutritionistId",
                schema: "nutri_clinic",
                table: "patients",
                column: "NutritionistId",
                principalSchema: "nutri_clinic",
                principalTable: "nutritionists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
