using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCompleted",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_ImageUrlLarge",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_ImageUrlMedium",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_ImageUrlSmall",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCompleted",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_ImageUrlLarge",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_ImageUrlMedium",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_ImageUrlSmall",
                table: "Books");
        }
    }
}
