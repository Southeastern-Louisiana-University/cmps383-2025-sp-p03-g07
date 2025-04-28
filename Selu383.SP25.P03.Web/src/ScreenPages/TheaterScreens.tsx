import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Screen } from "../types";

function TheaterScreenView() {
  const [screens, setScreens] = useState<Screen[]>([]);

  useEffect(() => {
    fetch("https://localhost:7027/api/screens")
      .then((res) => res.json())
      .then((data) => setScreens(data))
      .catch((err) => console.error("Failed to fetch screens:", err));
  }, []);

  // Group screens by theater
  const grouped = screens.reduce((acc: Record<number, Screen[]>, screen) => {
    if (!acc[screen.theaterId]) {
      acc[screen.theaterId] = [];
    }
    acc[screen.theaterId].push(screen);
    return acc;
  }, {});

  return (
    <Box p={4}>
      {/* Movie Carousel at the Top */}

      <Typography variant="h3" gutterBottom mt={4}>
        Theaters & Screens
      </Typography>

      {Object.entries(grouped).map(([theaterId, screensInTheater]) => (
        <Box key={theaterId} mb={6}>
          <Typography variant="h4" color="primary" gutterBottom>
            {screensInTheater[0].theaterName} - {screensInTheater[0].location}
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={3}>
            {screensInTheater.map((screen) => (
              <Card key={screen.screenId} sx={{ width: 300 }}>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="350px"
                    image={screen.movieUrl}
                    alt={screen.movieTitle}
                  />
                  <Typography variant="h6">
                    Screen #{screen.screenId}
                  </Typography>
                  <Typography variant="body1">
                    Seats: {screen.seatCount}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    Movie: <strong>{screen.movieTitle}</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {screen.movieGenre}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default TheaterScreenView;
