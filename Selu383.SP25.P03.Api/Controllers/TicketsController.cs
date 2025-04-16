using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Tickets;
using System.Linq;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly DataContext _context;
        public TicketsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("movieshowtime/{movieShowtimeId}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByMovieShowtime(int movieShowtimeId)
        {
            var tickets = await _context.Tickets.Where(t => t.MovieShowtimeId == movieShowtimeId).ToListAsync();
            return tickets;
        }

        [HttpPost("purchase")]
        public async Task<ActionResult<Ticket>> PurchaseTicket([FromBody] Ticket purchase)
        {
            var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.MovieShowtimeId == purchase.MovieShowtimeId &&
                                                                           t.SeatNumber == purchase.SeatNumber &&
                                                                           !t.IsPurchased);
            if (ticket == null)
                return BadRequest("Ticket not available or already purchased.");

            var showtime = await _context.MovieShowtimes
                                    .Include(ms => ms.Movie)
                                    .Include(ms => ms.Screen).ThenInclude(s => s.Theater)
                                    .FirstOrDefaultAsync(ms => ms.Id == purchase.MovieShowtimeId);
            if (showtime == null)
                return BadRequest("Invalid movie showtime.");

            ticket.ConfirmationCode = GenerateConfirmationCode(12);
            ticket.MovieName = showtime.Movie?.Title ?? "";
            ticket.TheaterLocation = showtime.Screen?.Theater?.Address ?? "";
            ticket.ShowTime = showtime.Showtime;
            ticket.CustomerName = purchase.CustomerName;
            ticket.PurchaseTime = DateTime.UtcNow;
            ticket.IsPurchased = true;
            ticket.SeatType = "Premium";
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicketsByMovieShowtime), new { movieShowtimeId = ticket.MovieShowtimeId }, ticket);
        }

        private string GenerateConfirmationCode(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
