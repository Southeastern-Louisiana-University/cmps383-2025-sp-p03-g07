using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Screens;

[Route("api/screens")]
[ApiController]
public class ScreensController : ControllerBase
{
    private readonly DataContext _context;

    public ScreensController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IQueryable<ScreenDto> GetAllScreens()
    {
        return _context.Screens
            .Select(s => new ScreenDto
            {
                ScreenId = s.Id,
                TheaterId = s.TheaterId,
                TheaterName = s.Theater.Name,
                Location = s.Theater.Address, // Assuming Address = Location
                SeatId = s.SeatId,
                MovieId = s.MovieId,
                MovieTitle = s.Movie.Title,
                MovieGenre = s.Movie.Genre,
                MovieUrl = s.Movie.ImageUrl
            });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ScreenDto>> GetScreenById(int id)
    {
        var screen = await _context.Screens
            .Include(s => s.Theater)
            .Include(s => s.Movie)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (screen == null)
        {
            return NotFound();
        }

        var dto = new ScreenDto
        {
            ScreenId = screen.Id,
            TheaterId = screen.TheaterId,
            TheaterName = screen.Theater?.Name,
            Location = screen.Theater?.Address,
            SeatId = screen.SeatId,
            MovieId = screen.MovieId,
            MovieTitle = screen.Movie?.Title,
            MovieGenre = screen.Movie?.Genre
        };

        return Ok(dto);
    }


    // Other controller actions like POST, PUT, DELETE would go here
}
