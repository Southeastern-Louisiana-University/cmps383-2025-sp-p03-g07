using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Screens;
using Selu383.SP25.P03.Api.Features.Theaters;
using Selu383.SP25.P03.Api.Features.Users;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/screens")]
    [ApiController]
    public class ScreensController : ControllerBase
    {
        private readonly DbSet<Screen> screens;
        private readonly DbSet<Theater> theaters;
        private readonly DbSet<Movie> movies;
        private readonly DataContext dataContext;
        private readonly DbSet<User> users;
        private readonly UserManager<User> userManager;

        public ScreensController(DataContext dataContext, UserManager<User> userManager)
        {
            this.dataContext = dataContext;
            screens = dataContext.Set<Screen>();
            theaters = dataContext.Set<Theater>();
            movies = dataContext.Set<Movie>();
            users = dataContext.Set<User>();
            this.userManager = userManager;
        }

        [HttpGet]
        public IQueryable<Screen> GetAllScreens()
        {
            return GetScreenDtos(screens);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<Screen> GetScreenById(int id)
        {
            var result = GetScreenDtos(screens.Where(x => x.Id == id)).FirstOrDefault();
            if (result == null)
            {
                return NotFound("Screen ID not found");
            }

            return Ok(result);
        }

        [HttpPost]
        // [Authorize(Roles = UserRoleNames.Admin)]
        public ActionResult<Screen> CreateScreen(Screen dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest("Something went wrong, please try again.");
            }

            var screen = new Screen
            {
                TheaterId = dto.TheaterId,
                MovieId = dto.MovieId,
                SeatCount = dto.SeatCount
            };

            dataContext.Screens.Add(screen);
            dataContext.SaveChanges();

            dto.Id = screen.Id;

            return CreatedAtAction(nameof(GetScreenById), new { id = dto.Id }, dto);
        }

        [HttpPut]
        [Route("{id}")]
        // [Authorize]
        public async Task<ActionResult<Screen>> UpdateScreen(int id, Screen dto)
        {
            if (IsInvalid(dto))
            {
                return BadRequest("Something went wrong, please try again.");
            }

            var screen = screens.FirstOrDefault(x => x.Id == id);
            if (screen == null)
            {
                return NotFound("Screen ID not found.");
            }

            screen.TheaterId = dto.TheaterId;
            screen.MovieId = dto.MovieId;
            screen.SeatCount = dto.SeatCount;

            dataContext.SaveChanges();

            dto.Id = screen.Id;

            return Ok("Successfully updated Screen");
        }

        [HttpDelete]
        [Route("{id}")]
        // [Authorize(Roles = UserRoleNames.Admin)]
        public ActionResult DeleteScreen(int id)
        {
            var screen = screens.FirstOrDefault(x => x.Id == id);
            if (screen == null)
            {
                return NotFound("Screen ID not found");
            }

            screens.Remove(screen);

            dataContext.SaveChanges();

            return Ok("Successfully deleted Screen");
        }

        private bool IsInvalid(Screen dto)
        {
            return dto.TheaterId <= 0 ||
                   dto.MovieId <= 0 ||
                   dto.SeatCount <= 0 ||
                   !theaters.Any(x => x.Id == dto.TheaterId) ||
                   !movies.Any(x => x.Id == dto.MovieId);
        }

        private static IQueryable<Screen> GetScreenDtos(IQueryable<Screen> screens)
        {
            return screens
                .Include(x => x.Theater)
                .Include(x => x.Movie)
                .Select(x => new Screen
                {
                    Id = x.Id,
                    SeatCount = x.SeatCount
                });
        }
    }
}
