using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BooksAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // as described in https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql/issues/84
            //
            migrationBuilder.Sql($@"ALTER DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");

            // generated migration code

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    BookId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(nullable: false),
                    GoodReadsID = table.Column<int>(nullable: true),
                    ASIN = table.Column<string>(nullable: true),
                    Isbn10 = table.Column<string>(nullable: true),
                    Isbn13 = table.Column<string>(nullable: true),
                    AmazonUrl = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Author = table.Column<string>(nullable: true),
                    YearPublished = table.Column<short>(nullable: true),
                    YearRevised = table.Column<short>(nullable: true),
                    WhereHeardAbout = table.Column<string>(nullable: true),
                    WhenHeardAbout = table.Column<string>(nullable: true),
                    WikipediaURL = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Tags = table.Column<string>(nullable: true),
                    DateCompleted = table.Column<DateTime>(nullable: true),
                    FlagRead = table.Column<bool>(nullable: false),
                    FlagCurrentlyReading = table.Column<bool>(nullable: false),
                    FlagPartiallyRead = table.Column<bool>(nullable: false),
                    FlagWantToRead = table.Column<bool>(nullable: false),
                    WantToReadScore = table.Column<short>(nullable: true),
                    OwnPrint = table.Column<bool>(nullable: false),
                    OwnKindle = table.Column<bool>(nullable: false),
                    OwnKindleSample = table.Column<bool>(nullable: false),
                    OwnPDF = table.Column<bool>(nullable: false),
                    OwnAudible = table.Column<bool>(nullable: false),
                    OwnOtherAudio = table.Column<bool>(nullable: false),
                    GR_Title = table.Column<string>(nullable: true),
                    GR_Author = table.Column<string>(nullable: true),
                    GR_Rating = table.Column<float>(nullable: true),
                    GR_RatingCount = table.Column<int>(nullable: true),
                    GR_ReviewCount = table.Column<int>(nullable: true),
                    GR_SyncDate = table.Column<DateTime>(nullable: true),
                    GR_Status = table.Column<string>(nullable: true),
                    GR_StatusMessage = table.Column<string>(nullable: true),
                    GR_OriginalPublicationYear = table.Column<int>(nullable: true),
                    GR_ImageUrlSmall = table.Column<string>(nullable: true),
                    GR_ImageUrlMedium = table.Column<string>(nullable: true),
                    GR_ImageUrlLarge = table.Column<string>(nullable: true),
                    Amz_Rating = table.Column<float>(nullable: true),
                    Amz_ReviewCount = table.Column<int>(nullable: true),
                    Amz_Status = table.Column<string>(nullable: true),
                    Amz_StatusMessage = table.Column<string>(nullable: true),
                    Amz_SyncDate = table.Column<DateTime>(nullable: true),
                    Private = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: true),
                    DateModified = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.BookId);
                    table.ForeignKey(
                        name: "FK_Books_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_UserId",
                table: "Books",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
