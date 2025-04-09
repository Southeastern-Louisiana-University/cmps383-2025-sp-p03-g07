import "./App.css";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import MovieFetch from "./MoviePage/MovieFetch";
import TheaterDetails from "./TheaterPage/TheaterDetails";

function Dashboard() {
  const navigate = useNavigate();

  // HomeScreen.tsx
  return (
    <Box>
      <MovieFetch />
      <TheaterDetails />
    </Box>
  );
}

export default Dashboard;
