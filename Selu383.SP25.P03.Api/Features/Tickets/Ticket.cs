using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Selu383.SP25.P03.Api.Features.Movies;

namespace Selu383.SP25.P03.Api.Features.Tickets
{
    public class Ticket
    {
        [Key]
        public int TicketId { get; set; }

        public int MovieShowtimeId { get; set; }
        [ForeignKey("MovieShowtimeId")]
        public MovieShowtime? MovieShowtime { get; set; }

        [Required]
        public string SeatNumber { get; set; } = "";

        [Required]
        public string SeatType { get; set; } = "Premium";

        public bool IsPurchased { get; set; }

        public DateTime? PurchaseTime { get; set; }

        [Required]
        public string ConfirmationCode { get; set; } = "";

        [Required]
        public string CustomerName { get; set; } = "";

        [Required]
        public string MovieName { get; set; } = "";

        [Required]
        public string TheaterLocation { get; set; } = "";

        public DateTime? ShowTime { get; set; }
    }
}
