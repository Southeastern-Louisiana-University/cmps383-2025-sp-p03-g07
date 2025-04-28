import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import axios from "axios";

// Define the Theater type
interface Theater {
  id: number;
  name: string;
  address: string;
  seatCount: number;
  imageUrl: string; // Assuming the theater has an image URL property
}

const MainPage: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Fetch theaters from the API
  const fetchTheaters = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Theater[]>(
        "https://localhost:7027/api/theaters"
      );
      setTheaters(response.data);
    } catch (error) {
      console.error("Error fetching theaters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Here, you can either filter theaters by location or redirect to a different page
    // For now, let's filter the theaters by the selected location
    const filteredTheaters = theaters.filter((theater) =>
      theater.address.toLowerCase().includes(location.toLowerCase())
    );
    setTheaters(filteredTheaters);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Select a Theater Location
      </Typography>

      <Grid container spacing={4}>
        {theaters.map((theater) => (
          <Grid key={theater.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={theater.imageUrl}
                alt={theater.name}
              />
              <CardContent>
                <Typography variant="h5">{theater.name}</Typography>
                <Typography variant="body1">{theater.address}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleLocationSelect(theater.address)}
                >
                  Select Location
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Display selected location */}
      {selectedLocation && (
        <Typography variant="h6" mt={4}>
          You have selected theaters in: {selectedLocation}
        </Typography>
      )}
    </Container>
  );
};

export default MainPage;
