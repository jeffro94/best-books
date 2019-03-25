﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BooksAPI.Models;

namespace BooksAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Books")]
    public class BooksController : Controller
    {
        private readonly BooksContext _context;

        public BooksController(BooksContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public IEnumerable<Book> GetBooks()
        {
            return _context.Books;
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = await _context.Books.SingleOrDefaultAsync(b => b.BookId.Equals(id));

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // GET: api/Books/UserId/2
        [HttpGet("UserId/{userId}")]
        public async Task<IActionResult> GetBooksByUserId([FromRoute] int userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // first make sure the user exists. if not, return 404
            var userCount = await _context.Users.CountAsync(m => m.UserId == userId);

            if (userCount == 0)
            {
                return NotFound();
            }

            var books = await _context.Books.Where(book => book.UserId.Equals(userId)).ToListAsync();

            return Ok(books);
        }

        // GET: api/Tags/distinct
        [HttpGet("UserId/{userId}/tags")]
        public async Task<List<String>> GetDistinctTags([FromRoute] int userId)
        {
            List<string> rawValues = await _context.Books
                .Where(book => book.UserId.Equals(userId) && !String.IsNullOrWhiteSpace(book.Tags))
                .Select(book => book.Tags).ToListAsync();

            List<string> allValues = new List<string>();

            rawValues.ForEach(value =>
            {
                allValues.AddRange(value.Split(","));
            });

            return new SortedSet<string>(allValues).ToList();

        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook([FromRoute] int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != book.BookId)
            {
                return BadRequest();
            }

            book.DateModified = DateTime.Now;
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Books
        [HttpPost]
        public async Task<IActionResult> PostBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            book.DateModified = DateTime.Now;
            book.DateCreated = DateTime.Now;
            _context.Books.Add(book);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.BookId == id);
        }
    }
}