using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Screens;

namespace Selu383.SP25.P03.Api.Features.Screens
{
    public static class SeedScreens
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<DataContext>();

            if (context.Screens.Any())
            {
                // Already seeded
                return;
            }

            var theaters = await context.Theaters.ToListAsync();
            var movies = await context.Movies.ToListAsync();

            if (!theaters.Any() || !movies.Any())
            {
                // Can't seed screens if no theaters or movies
                return;
            }

            var random = new Random();
            var screens = new List<Screen>();

            foreach (var theater in theaters)
            {
                for (int i = 1; i <= 4; i++)
                {
                    var movie = movies[random.Next(movies.Count)]; // pick random movie

                    screens.Add(new Screen
                    {
                        TheaterId = theater.Id,
                        MovieId = movie.Id,
                        SeatId = random.Next(80, 150) // random seat count between 80 and 150
                    });
                }
            }

            context.Screens.AddRange(screens);
            await context.SaveChangesAsync();
        }
    }
}
