using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public int MovieId { get; set; }
        public Movie? Movie { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; } // Example: 1 to 5 stars

        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
