using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categories",
                table: "Books");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Categories",
                table: "Books",
                nullable: true);
        }
    }
}
