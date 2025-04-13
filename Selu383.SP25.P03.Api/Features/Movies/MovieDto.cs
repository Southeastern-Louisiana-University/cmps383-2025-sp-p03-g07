﻿using Selu383.SP25.P03.Api.Features.Theaters;

namespace Selu383.SP25.P03.Api.Features.Movies
{
    public class MovieDto
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Genre { get; set; }
        public int RuntimeMinutes { get; set; }

        public int TheaterId { get; set; }

    }
}
