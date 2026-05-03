using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubPatient.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOnboardingCompleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "OnboardingCompleted",
                schema: "nutri_patient",
                table: "patients",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OnboardingCompleted",
                schema: "nutri_patient",
                table: "patients");
        }
    }
}
