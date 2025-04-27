using System.ComponentModel.DataAnnotations;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class FeedbackDto
    {
        public int Id { get; set; }  
        public int MovieId { get; set; }
        public int Rating { get; set; } 
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }  
    }
}
