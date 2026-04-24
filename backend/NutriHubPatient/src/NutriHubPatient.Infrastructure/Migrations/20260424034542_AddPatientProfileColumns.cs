using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubPatient.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPatientProfileColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfBirth",
                schema: "patient",
                table: "patients",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "HeightCm",
                schema: "patient",
                table: "patients",
                type: "numeric(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                schema: "patient",
                table: "patients",
                type: "character varying(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "WeightKg",
                schema: "patient",
                table: "patients",
                type: "numeric(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                schema: "patient",
                table: "patients");

            migrationBuilder.DropColumn(
                name: "HeightCm",
                schema: "patient",
                table: "patients");

            migrationBuilder.DropColumn(
                name: "Phone",
                schema: "patient",
                table: "patients");

            migrationBuilder.DropColumn(
                name: "WeightKg",
                schema: "patient",
                table: "patients");
        }
    }
}
