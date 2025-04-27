using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Selu383.SP25.P03.Api.Data;
using Selu383.SP25.P03.Api.Features.Movies;
using Selu383.SP25.P03.Api.Features.Users;

namespace Selu383.SP25.P03.Api.Controllers
{
    [Route("api/feedbacks")]
    [ApiController]
    [Authorize]
    public class FeedbackController : ControllerBase
    {
        private readonly DataContext _context;

        public FeedbackController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<FeedbackDto>> SubmitFeedback([FromBody] FeedbackDto dto)
        {
            var username = User.Identity?.Name;

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("User must be logged in to submit feedback.");
            }

            var feedback = new Feedback
            {
                MovieId = dto.MovieId,
                Rating = dto.Rating,
                Comment = dto.Comment,
                Username = username,
                CreatedAt = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            // Populate the FeedbackDto with the created feedback's additional info (Id, CreatedAt)
            dto.Id = feedback.Id;
            dto.CreatedAt = feedback.CreatedAt;

            return CreatedAtAction(nameof(SubmitFeedback), new { id = feedback.Id }, dto);
        }
    }
}
