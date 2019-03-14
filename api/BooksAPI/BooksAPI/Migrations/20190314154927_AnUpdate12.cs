using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Isbn10",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Isbn13",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Isbn10",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Isbn13",
                table: "Books");
        }
    }
}
