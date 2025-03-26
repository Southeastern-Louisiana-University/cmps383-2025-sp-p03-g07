import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Theater } from "./types";
import { CircularProgress, Typography, Box } from "@mui/material";
import React from "react";

const TheaterPage = () => {
  const { id } = useParams<{ id: string }>();
  const [theater, setTheater] = useState<Theater | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7027/api/theaters/${id}`
        );
        setTheater(response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTheater();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!theater) return <Typography>No theater found.</Typography>;

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <Typography variant="h4">{theater.name}</Typography>
      <Typography variant="h6">Address: {theater.address}</Typography>
      <Typography variant="body1">{theater.seatCount}</Typography>
    </Box>
  );
};

export default TheaterPage;
