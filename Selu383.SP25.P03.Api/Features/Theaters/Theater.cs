using Selu383.SP25.P03.Api.Features.Screens;
using Selu383.SP25.P03.Api.Features.Users;
using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Theaters
{
    public class Theater
    {
        public int Id { get; set; }
        [MaxLength(120)]
        public required string Name { get; set; }
        public required string Address { get; set; }
        public int SeatCount { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<Screen> Screens { get; set; } = new List<Screen>();
    }
}
