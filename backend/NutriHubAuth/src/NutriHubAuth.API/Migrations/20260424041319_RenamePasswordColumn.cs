using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NutriHubAuth.API.Migrations
{
    /// <inheritdoc />
    public partial class RenamePasswordColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "password_hash",
                schema: "nutri_auth",
                table: "users",
                newName: "Password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                schema: "nutri_auth",
                table: "users",
                newName: "password_hash");
        }
    }
}
