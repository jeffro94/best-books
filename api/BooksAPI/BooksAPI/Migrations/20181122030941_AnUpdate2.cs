using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "YearRevised",
                table: "Books",
                nullable: true,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "YearPublished",
                table: "Books",
                nullable: true,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<short>(
                name: "WantToReadScore",
                table: "Books",
                nullable: true,
                oldClrType: typeof(short));

            migrationBuilder.AlterColumn<int>(
                name: "GoodReadsID",
                table: "Books",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<short>(
                name: "YearRevised",
                table: "Books",
                nullable: false,
                oldClrType: typeof(short),
                oldNullable: true);

            migrationBuilder.AlterColumn<short>(
                name: "YearPublished",
                table: "Books",
                nullable: false,
                oldClrType: typeof(short),
                oldNullable: true);

            migrationBuilder.AlterColumn<short>(
                name: "WantToReadScore",
                table: "Books",
                nullable: false,
                oldClrType: typeof(short),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "GoodReadsID",
                table: "Books",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
