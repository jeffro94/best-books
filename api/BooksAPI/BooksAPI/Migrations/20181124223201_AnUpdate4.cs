using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class AnUpdate4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GR_Author",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "GR_Rating",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GR_ReviewCount",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_Status",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_StatusMessage",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "GR_SyncDate",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GR_Title",
                table: "Books",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "OwnKindleSample",
                table: "Books",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GR_Author",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_Rating",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_ReviewCount",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_Status",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_StatusMessage",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_SyncDate",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "GR_Title",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "OwnKindleSample",
                table: "Books");
        }
    }
}
