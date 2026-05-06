using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubClinic.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddTrackingRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TrackingRequests",
                schema: "nutri_clinic",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientName = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    PatientEmail = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    NutritionistId = table.Column<Guid>(type: "uuid", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackingRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrackingRequests_Nutritionists_NutritionistId",
                        column: x => x.NutritionistId,
                        principalSchema: "nutri_clinic",
                        principalTable: "Nutritionists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrackingRequests_NutritionistId",
                schema: "nutri_clinic",
                table: "TrackingRequests",
                column: "NutritionistId");

            migrationBuilder.CreateIndex(
                name: "IX_TrackingRequests_PatientId_NutritionistId",
                schema: "nutri_clinic",
                table: "TrackingRequests",
                columns: new[] { "PatientId", "NutritionistId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TrackingRequests",
                schema: "nutri_clinic");
        }
    }
}
