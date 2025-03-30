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

        [HttpGet("movieschedule/{movieScheduleId}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketsByMovieSchedule(int movieScheduleId)
        {
            var tickets = await _context.Tickets.Where(t => t.MovieScheduleId == movieScheduleId).ToListAsync();
            return tickets;
        }

        [HttpPost("purchase")]
        public async Task<ActionResult<Ticket>> PurchaseTicket([FromBody] Ticket purchase)
        {
            var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.MovieScheduleId == purchase.MovieScheduleId &&
                                                                           t.SeatNumber == purchase.SeatNumber &&
                                                                           !t.IsPurchased);
            if (ticket == null)
                return BadRequest("Ticket not available or already purchased.");

            var schedule = await _context.MovieSchedules
                                    .Include(ms => ms.Movie)
                                    .Include(ms => ms.Theater)
                                    .FirstOrDefaultAsync(ms => ms.Id == purchase.MovieScheduleId);
            if (schedule == null)
                return BadRequest("Invalid movie schedule.");

            ticket.ConfirmationCode = GenerateConfirmationCode(12);
            ticket.MovieName = schedule.Movie?.Title ?? "";
            ticket.TheaterLocation = schedule.Theater?.Address ?? "";
            ticket.ShowTime = schedule.Showtime;
            ticket.CustomerName = purchase.CustomerName;
            ticket.PurchaseTime = DateTime.UtcNow;
            ticket.IsPurchased = true;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTicketsByMovieSchedule), new { movieScheduleId = ticket.MovieScheduleId }, ticket);
        }

        private string GenerateConfirmationCode(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
