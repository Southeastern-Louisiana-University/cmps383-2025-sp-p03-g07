using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Theaters;
using Selu383.SP25.P03.Api.Features.Users;
using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Screens
{
    public class Screen
    {
        public int Id { get; set; }
        public int TheaterId { get; set; }
        public Theater Theater { get; set; }
        public int SeatId { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
    }
}
