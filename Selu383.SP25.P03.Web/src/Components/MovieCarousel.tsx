import { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { Movie } from "../types";

function MovieCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://localhost:7027/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  const scroll = (offset: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#00000f"
      borderRadius="15px"
      p={4}
    >
      <Button
        variant="contained"
        onClick={() => scroll(-300)}
        sx={{ mr: 2, backgroundColor: "#d8b4fe", color: "black" }}
      >
        &#8592;
      </Button>

      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          width: "100%",
          p: 2,
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            variant="outlined"
            sx={{ minWidth: 500, maxWidth: 800 }}
          >
            <CardMedia
              component="img"
              height="600"
              width="800"
              image={movie.imageUrl}
              alt={movie.title}
            />
            <Box p={2}>
              <Typography variant="h5" gutterBottom>
                {movie.title}
              </Typography>
              <Typography variant="body2">{movie.description}</Typography>
              <Typography variant="body2">
                <strong>Genre:</strong> {movie.genre}
              </Typography>
              <Typography variant="body2">
                <strong>Runtime:</strong> {movie.runtimeMinutes} min
              </Typography>
              <Typography variant="body2">
                <strong>Showtimes:</strong>
              </Typography>
              <ul>
                {movie.showtimes.map((st, index) => (
                  <li key={index}>
                    {new Date(st.showtime).toLocaleTimeString()}
                  </li>
                ))}
              </ul>
            </Box>
          </Card>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => scroll(300)}
        sx={{ ml: 2, backgroundColor: "#d8b4fe", color: "black" }}
      >
        &#8594;
      </Button>
    </Box>
  );
}

export default MovieCarousel;
