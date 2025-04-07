import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Theater } from "../types"; // Make sure Theater type is defined
import TheaterPost from "../TheaterPage/TheaterPost";
import TheaterUpdate from "../TheaterPage/TheaterUpdate";
import TheaterDelete from "../TheaterPage/TheaterDelete";

const TheaterDashboard: React.FC = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("https://localhost:7027/api/theaters");
        setTheaters(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load theaters. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom align="center">
        Theater Dashboard
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="right">Seat Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theaters.map((theater) => (
                <TableRow key={theater.id}>
                  <TableCell>{theater.id}</TableCell>
                  <TableCell>{theater.name}</TableCell>
                  <TableCell>{theater.address}</TableCell>
                  <TableCell align="right">{theater.seatCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TheaterPost />
      <TheaterUpdate />
      <TheaterDelete />
    </Container>
  );
};

export default TheaterDashboard;
