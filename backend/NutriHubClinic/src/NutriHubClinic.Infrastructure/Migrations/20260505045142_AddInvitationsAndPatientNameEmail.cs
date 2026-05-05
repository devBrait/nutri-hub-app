using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubClinic.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddInvitationsAndPatientNameEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "nutri_clinic",
                table: "Patients",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "nutri_clinic",
                table: "Patients",
                type: "character varying(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Invitations",
                schema: "nutri_clinic",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Token = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    NutritionistId = table.Column<Guid>(type: "uuid", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invitations_Nutritionists_NutritionistId",
                        column: x => x.NutritionistId,
                        principalSchema: "nutri_clinic",
                        principalTable: "Nutritionists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_Email_NutritionistId",
                schema: "nutri_clinic",
                table: "Invitations",
                columns: new[] { "Email", "NutritionistId" });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_NutritionistId",
                schema: "nutri_clinic",
                table: "Invitations",
                column: "NutritionistId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_Token",
                schema: "nutri_clinic",
                table: "Invitations",
                column: "Token",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invitations",
                schema: "nutri_clinic");

            migrationBuilder.DropColumn(
                name: "Email",
                schema: "nutri_clinic",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "Name",
                schema: "nutri_clinic",
                table: "Patients");
        }
    }
}
