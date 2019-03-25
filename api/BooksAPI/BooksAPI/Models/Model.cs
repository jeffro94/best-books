using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BooksAPI.Models
{
    public class BooksContext : DbContext
    {
        public BooksContext(DbContextOptions<BooksContext> options)
            : base(options)
        { }

        public DbSet<Book> Books { get; set; }
        public DbSet<User> Users { get; set; }
    }

    public class Book
    {
        public int BookId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int? GoodReadsID { get; set; }
        public string ASIN { get; set; }
        public string Isbn10 { get; set; }
        public string Isbn13 { get; set; }
        public string AmazonUrl { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        public short? YearPublished { get; set; }
        public short? YearRevised { get; set; }

        public string WhereHeardAbout { get; set; }
        public string WhenHeardAbout { get; set; }

        public string WikipediaURL { get; set; }

        public string Notes { get; set; }
        public string Tags { get; set; }

        public bool FlagRead { get; set; }
        public bool FlagCurrentlyReading { get; set; }
        public bool FlagPartiallyRead { get; set; }
        public bool FlagWantToRead { get; set; }

        [Range(1, 5)]
        public short? WantToReadScore { get; set; }

        public bool OwnPrint { get; set; }
        public bool OwnKindle { get; set; }
        public bool OwnKindleSample { get; set; }
        public bool OwnPDF { get; set; }
        public bool OwnAudible { get; set; }
        public bool OwnOtherAudio { get; set; }

        public string GR_Title { get; set; }
        public string GR_Author { get; set; }
        public float? GR_Rating { get; set; }
        public int? GR_RatingCount { get; set; }
        public int? GR_ReviewCount { get; set; }
        public DateTime? GR_SyncDate { get; set; }
        public string GR_Status { get; set; }
        public string GR_StatusMessage { get; set; }
        public int? GR_OriginalPublicationYear { get; set; }

        public float? Amz_Rating { get; set; }
        public int? Amz_ReviewCount { get; set; }
        public string Amz_Status { get; set; }
        public string Amz_StatusMessage { get; set; }
        public DateTime? Amz_SyncDate { get; set; }

        public string Temp1 { get; set; }
        public string Temp2 { get; set; }
        public string Temp3 { get; set; }
        public string Temp4 { get; set; }
        public string Temp5 { get; set; }

        public Boolean Demo { get; set; }

        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

    }

    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }

        public DateTime? DateCreated { get; set; }

        public List<Book> Books { get; set; }
    }

}