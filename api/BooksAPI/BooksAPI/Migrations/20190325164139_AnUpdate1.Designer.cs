﻿// <auto-generated />
using System;
using BooksAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BooksAPI.Migrations
{
    [DbContext(typeof(BooksContext))]
    [Migration("20190325164139_AnUpdate1")]
    partial class AnUpdate1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("BooksAPI.Models.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ASIN");

                    b.Property<string>("AmazonUrl");

                    b.Property<float?>("Amz_Rating");

                    b.Property<int?>("Amz_ReviewCount");

                    b.Property<string>("Amz_Status");

                    b.Property<string>("Amz_StatusMessage");

                    b.Property<DateTime?>("Amz_SyncDate");

                    b.Property<string>("Author");

                    b.Property<string>("Categories");

                    b.Property<DateTime?>("DateCreated");

                    b.Property<DateTime?>("DateModified");

                    b.Property<bool>("Demo");

                    b.Property<bool>("FlagCurrentlyReading");

                    b.Property<bool>("FlagPartiallyRead");

                    b.Property<bool>("FlagRead");

                    b.Property<bool>("FlagWantToRead");

                    b.Property<string>("GR_Author");

                    b.Property<int?>("GR_OriginalPublicationYear");

                    b.Property<float?>("GR_Rating");

                    b.Property<int?>("GR_RatingCount");

                    b.Property<int?>("GR_ReviewCount");

                    b.Property<string>("GR_Status");

                    b.Property<string>("GR_StatusMessage");

                    b.Property<DateTime?>("GR_SyncDate");

                    b.Property<string>("GR_Title");

                    b.Property<int?>("GoodReadsID");

                    b.Property<string>("Isbn10");

                    b.Property<string>("Isbn13");

                    b.Property<string>("Notes");

                    b.Property<bool>("OwnAudible");

                    b.Property<bool>("OwnKindle");

                    b.Property<bool>("OwnKindleSample");

                    b.Property<bool>("OwnOtherAudio");

                    b.Property<bool>("OwnPDF");

                    b.Property<bool>("OwnPrint");

                    b.Property<string>("Temp1");

                    b.Property<string>("Temp2");

                    b.Property<string>("Temp3");

                    b.Property<string>("Temp4");

                    b.Property<string>("Temp5");

                    b.Property<string>("Title");

                    b.Property<int>("UserId");

                    b.Property<short?>("WantToReadScore");

                    b.Property<string>("WhenHeardAbout");

                    b.Property<string>("WhereHeardAbout");

                    b.Property<string>("WikipediaURL");

                    b.Property<short?>("YearPublished");

                    b.Property<short?>("YearRevised");

                    b.HasKey("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("BooksAPI.Models.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BookId");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Name");

                    b.HasKey("TagId");

                    b.HasIndex("BookId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("BooksAPI.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DateCreated");

                    b.Property<string>("Username");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BooksAPI.Models.Book", b =>
                {
                    b.HasOne("BooksAPI.Models.User", "User")
                        .WithMany("Books")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
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
