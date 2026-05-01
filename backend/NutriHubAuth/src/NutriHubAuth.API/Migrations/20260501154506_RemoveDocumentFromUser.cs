using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubAuth.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDocumentFromUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_users_Document",
                schema: "nutri_auth",
                table: "users");

            migrationBuilder.DropColumn(
                name: "Document",
                schema: "nutri_auth",
                table: "users");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Document",
                schema: "nutri_auth",
                table: "users",
                type: "character varying(14)",
                maxLength: 14,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_users_Document",
                schema: "nutri_auth",
                table: "users",
                column: "Document",
                unique: true);
        }
    }
}
