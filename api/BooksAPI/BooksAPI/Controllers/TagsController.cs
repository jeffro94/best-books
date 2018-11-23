using System;
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
    [Route("api/Tags")]
    public class TagsController : Controller
    {
        private readonly BooksContext _context;

        public TagsController(BooksContext context)
        {
            _context = context;
        }

        // GET: api/Tags
        [HttpGet]
        public IEnumerable<Tag> GetTags()
        {
            return _context.Tags;
        }

        // GET: api/Tags/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTag([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tag = await _context.Tags.SingleOrDefaultAsync(m => m.TagId == id);

            if (tag == null)
            {
                return NotFound();
            }

            return Ok(tag);
        }

        private bool TagExists(int id)
        {
            return _context.Tags.Any(e => e.TagId == id);
        }
    }
}