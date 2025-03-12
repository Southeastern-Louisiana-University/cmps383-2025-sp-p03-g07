using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Selu383.SP25.P03.Api.Features.Movies;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Selu383.SP25.P03.Api.Data
{
    public static class SeedMovies
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataContext(serviceProvider.GetRequiredService<DbContextOptions<DataContext>>()))
            {
                context.Movies.RemoveRange(context.Movies);
                context.SaveChanges();
                var movies = new List<Movie>
                {
                    new Movie
                    {
                        Title = "Iron Man",
                        Description = "Tony Stark becomes Iron Man",
                        Genre = "Action",
                        RuntimeMinutes = 126,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(1) },
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(4) }
                        }
                    },
                    new Movie
                    {
                        Title = "The Incredible Hulk",
                        Description = "Bruce Banner transforms into the Hulk",
                        Genre = "Action",
                        RuntimeMinutes = 112,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(2) }
                        }
                    },
                    new Movie
                    {
                        Title = "Iron Man 2",
                        Description = "Tony Stark faces new challenges",
                        Genre = "Action",
                        RuntimeMinutes = 124,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(3) }
                        }
                    },
                    new Movie
                    {
                        Title = "Thor",
                        Description = "Thor's journey on Earth",
                        Genre = "Action",
                        RuntimeMinutes = 115,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(5) }
                        }
                    },
                    new Movie
                    {
                        Title = "Captain America: The First Avenger",
                        Description = "Steve Rogers becomes Captain America",
                        Genre = "Action",
                        RuntimeMinutes = 124,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(6) }
                        }
                    },
                    new Movie
                    {
                        Title = "The Avengers",
                        Description = "Heroes unite to save the world",
                        Genre = "Action",
                        RuntimeMinutes = 143,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(7) }
                        }
                    },
                    new Movie
                    {
                        Title = "Iron Man 3",
                        Description = "Tony Stark confronts a new enemy",
                        Genre = "Action",
                        RuntimeMinutes = 130,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(8) }
                        }
                    },
                    new Movie
                    {
                        Title = "Thor: The Dark World",
                        Description = "Thor battles the Dark Elves",
                        Genre = "Action",
                        RuntimeMinutes = 112,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(9) }
                        }
                    },
                    new Movie
                    {
                        Title = "Captain America: The Winter Soldier",
                        Description = "Captain America faces a conspiracy",
                        Genre = "Action",
                        RuntimeMinutes = 136,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(10) }
                        }
                    },
                    new Movie
                    {
                        Title = "Guardians of the Galaxy",
                        Description = "A group of misfits becomes heroes",
                        Genre = "Action",
                        RuntimeMinutes = 121,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(11) }
                        }
                    },
                    new Movie
                    {
                        Title = "Avengers: Age of Ultron",
                        Description = "The Avengers battle Ultron",
                        Genre = "Action",
                        RuntimeMinutes = 141,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(12) }
                        }
                    },
                    new Movie
                    {
                        Title = "Ant-Man",
                        Description = "A thief becomes a superhero",
                        Genre = "Action",
                        RuntimeMinutes = 117,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(13) }
                        }
                    },
                    new Movie
                    {
                        Title = "Captain America: Civil War",
                        Description = "A conflict divides the Avengers",
                        Genre = "Action",
                        RuntimeMinutes = 147,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(14) }
                        }
                    },
                    new Movie
                    {
                        Title = "Doctor Strange",
                        Description = "A surgeon learns the mystic arts",
                        Genre = "Action",
                        RuntimeMinutes = 115,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(15) }
                        }
                    },
                    new Movie
                    {
                        Title = "Guardians of the Galaxy Vol. 2",
                        Description = "The Guardians continue their adventure",
                        Genre = "Action",
                        RuntimeMinutes = 136,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(16) }
                        }
                    },
                    new Movie
                    {
                        Title = "Spider-Man: Homecoming",
                        Description = "Peter Parker balances life and heroism",
                        Genre = "Action",
                        RuntimeMinutes = 133,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(17) }
                        }
                    },
                    new Movie
                    {
                        Title = "Thor: Ragnarok",
                        Description = "Thor faces a new threat",
                        Genre = "Action",
                        RuntimeMinutes = 130,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(18) }
                        }
                    },
                    new Movie
                    {
                        Title = "Black Panther",
                        Description = "The king of Wakanda rises",
                        Genre = "Action",
                        RuntimeMinutes = 134,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(19) }
                        }
                    },
                    new Movie
                    {
                        Title = "Avengers: Infinity War",
                        Description = "The Avengers face their toughest enemy",
                        Genre = "Action",
                        RuntimeMinutes = 149,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(20) }
                        }
                    },
                    new Movie
                    {
                        Title = "Ant-Man and the Wasp",
                        Description = "A heist with a twist",
                        Genre = "Action",
                        RuntimeMinutes = 118,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(21) }
                        }
                    },
                    new Movie
                    {
                        Title = "Captain Marvel",
                        Description = "A powerful new hero emerges",
                        Genre = "Action",
                        RuntimeMinutes = 123,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(22) }
                        }
                    },
                    new Movie
                    {
                        Title = "Avengers: Endgame",
                        Description = "The epic conclusion to the saga",
                        Genre = "Action",
                        RuntimeMinutes = 181,
                        Showtimes = new List<MovieShowtime>
                        {
                            new MovieShowtime { Showtime = DateTime.Now.AddHours(23) }
                        }
                    }
                };
                context.Movies.AddRange(movies);
                context.SaveChanges();
            }
        }
    }
}
