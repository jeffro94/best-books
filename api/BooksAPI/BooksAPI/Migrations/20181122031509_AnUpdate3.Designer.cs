﻿// <auto-generated />
using System;
using BooksAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BooksAPI.Migrations
{
    [DbContext(typeof(BooksContext))]
    [Migration("20181122031509_AnUpdate3")]
    partial class AnUpdate3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BooksAPI.Models.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ASIN");

                    b.Property<string>("Author");

                    b.Property<string>("Categories");

                    b.Property<DateTime?>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<bool>("FlagCurrentlyReading");

                    b.Property<bool>("FlagPartiallyRead");

                    b.Property<bool>("FlagRead");

                    b.Property<bool>("FlagWantToRead");

                    b.Property<int?>("GoodReadsID");

                    b.Property<string>("Notes");

                    b.Property<bool>("OwnAudible");

                    b.Property<bool>("OwnKindle");

                    b.Property<bool>("OwnOtherAudio");

                    b.Property<bool>("OwnPDF");

                    b.Property<bool>("OwnPrint");

                    b.Property<string>("Title");

                    b.Property<short?>("WantToReadScore");

                    b.Property<string>("WhenHeardAbout");

                    b.Property<string>("WhereHeardAbout");

                    b.Property<string>("WikipediaURL");

                    b.Property<short?>("YearPublished");

                    b.Property<short?>("YearRevised");

                    b.HasKey("BookId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("BooksAPI.Models.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BookId");

                    b.Property<string>("Name");

                    b.HasKey("TagId");

                    b.HasIndex("BookId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("BooksAPI.Models.Tag", b =>
                {
                    b.HasOne("BooksAPI.Models.Book", "Book")
                        .WithMany("Tags")
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
