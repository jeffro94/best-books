using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GR_OriginalPublicationYear",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GR_RatingCount",
                table: "Books",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GR_OriginalPublicationYear",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_RatingCount",
                table: "Books");
        }
    }
}
