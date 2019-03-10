using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Amz_Rating",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Amz_ReviewCount",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Amz_Status",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Amz_StatusMessage",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amz_Rating",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Amz_ReviewCount",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Amz_Status",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Amz_StatusMessage",
                table: "Books");
        }
    }
}
