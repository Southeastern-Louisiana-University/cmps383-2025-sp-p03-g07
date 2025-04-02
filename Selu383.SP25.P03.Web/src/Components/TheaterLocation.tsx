import { useState, useEffect } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Theater } from "../types";

const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<number>(0);
  const [, setLoading] = useState(false);
  const [, setVisible] = useState(false); // Controls visibility
  const navigate = useNavigate();

  const fetchTheaters = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://localhost:7027/api/theaters");
      setTheaters(response.data); // Store API data in state
      setVisible(true); // Show the data when fetched
    } catch (error) {
      console.error("Error fetching theaters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters(); // Call fetchTheaters on component mount
  }, []); // Empty dependency array to call only once when the component mounts

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedTheater(event.target.value as number); // Update selected theater ID
  };

  const handleSubmit = () => {
    if (selectedTheater) {
      navigate(`/theaters/${selectedTheater}`);
    }
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="select-theater-label" sx={{ color: "white" }}>
            Select Theater
          </InputLabel>
          <Select
            labelId="select-theater-label"
            value={selectedTheater}
            onChange={handleChange}
            sx={{
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ddd",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          >
            {theaters.map((theater) => (
              <MenuItem key={theater.id} value={theater.id}>
                {theater.name} - {theater.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          disabled={!selectedTheater}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default TheaterList;
