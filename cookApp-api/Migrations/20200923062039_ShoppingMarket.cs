using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace cookApp_api.Migrations
{
    public partial class ShoppingMarket : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Time",
                table: "Recipe",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Allergy",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Allergy", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Allergy_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingMarket",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingMarket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingMarket_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MarketGroupShopping",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Created = table.Column<DateTime>(nullable: false),
                    Section = table.Column<string>(nullable: true),
                    ShoppingMarketId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MarketGroupShopping", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MarketGroupShopping_ShoppingMarket_ShoppingMarketId",
                        column: x => x.ShoppingMarketId,
                        principalTable: "ShoppingMarket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ShoppingRecipe",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShoppingMarketId = table.Column<int>(nullable: false),
                    RecipeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingRecipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShoppingRecipe_Recipe_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipe",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShoppingRecipe_ShoppingMarket_ShoppingMarketId",
                        column: x => x.ShoppingMarketId,
                        principalTable: "ShoppingMarket",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Allergy_UserId",
                table: "Allergy",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MarketGroupShopping_ShoppingMarketId",
                table: "MarketGroupShopping",
                column: "ShoppingMarketId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingMarket_UserId",
                table: "ShoppingMarket",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingRecipe_RecipeId",
                table: "ShoppingRecipe",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_ShoppingRecipe_ShoppingMarketId",
                table: "ShoppingRecipe",
                column: "ShoppingMarketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Allergy");

            migrationBuilder.DropTable(
                name: "MarketGroupShopping");

            migrationBuilder.DropTable(
                name: "ShoppingRecipe");

            migrationBuilder.DropTable(
                name: "ShoppingMarket");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Recipe");
        }
    }
}
