using Microsoft.EntityFrameworkCore.Migrations;

namespace cookApp_api.Migrations
{
    public partial class addColumnsRecipeUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyIngredients",
                table: "Recipe",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Persons",
                table: "Recipe",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Recipe",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "User");

            migrationBuilder.DropColumn(
                name: "State",
                table: "User");

            migrationBuilder.DropColumn(
                name: "BuyIngredients",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Persons",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Recipe");
        }
    }
}
