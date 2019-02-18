using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    BookId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GoodReadsID = table.Column<int>(nullable: false),
                    ASIN = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Author = table.Column<string>(nullable: true),
                    YearPublished = table.Column<short>(nullable: false),
                    YearRevised = table.Column<short>(nullable: false),
                    WhereHeardAbout = table.Column<string>(nullable: true),
                    WhenHeardAbout = table.Column<string>(nullable: true),
                    WikipediaURL = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Categories = table.Column<string>(nullable: true),
                    FlagRead = table.Column<bool>(nullable: false),
                    FlagCurrentlyReading = table.Column<bool>(nullable: false),
                    FlagPartiallyRead = table.Column<bool>(nullable: false),
                    FlagWantToRead = table.Column<bool>(nullable: false),
                    WantToReadScore = table.Column<short>(nullable: false),
                    OwnPrint = table.Column<bool>(nullable: false),
                    OwnKindle = table.Column<bool>(nullable: false),
                    OwnPDF = table.Column<bool>(nullable: false),
                    OwnAudible = table.Column<bool>(nullable: false),
                    OweAudioOther = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.BookId);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    TagId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    BookId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.TagId);
                    table.ForeignKey(
                        name: "FK_Tags_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "BookId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tags_BookId",
                table: "Tags",
                column: "BookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
