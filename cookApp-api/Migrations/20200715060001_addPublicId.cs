using Microsoft.EntityFrameworkCore.Migrations;

namespace cookApp_api.Migrations
{
    public partial class addPublicId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Recipe",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "FollowUser",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Recipe");

            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "FollowUser");
        }
    }
}
