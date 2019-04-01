using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Temp1",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Temp2",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Temp3",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Temp4",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Temp5",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "Demo",
                table: "Books",
                newName: "Private");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Private",
                table: "Books",
                newName: "Demo");

            migrationBuilder.AddColumn<string>(
                name: "Temp1",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Temp2",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Temp3",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Temp4",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Temp5",
                table: "Books",
                nullable: true);
        }
    }
}
