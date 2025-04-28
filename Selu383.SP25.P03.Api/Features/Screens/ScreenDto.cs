using Selu383.SP25.P03.Api.Features.Users;
using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Screens
{
    public class ScreenDto
    {
        public int ScreenId { get; set; }
        public int TheaterId { get; set; }
        public string TheaterName { get; set; }
        public string Location { get; set; }
        public int SeatId { get; set; }
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public string MovieGenre { get; set; }
        public string MovieUrl { get; set; }
    }

}
