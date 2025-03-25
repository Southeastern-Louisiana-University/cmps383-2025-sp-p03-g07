import { useState, useEffect } from "react";
import axios from "axios";
import { Theater } from "./types"; // Import the Theater type
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<number>(0);
  const [, setLoading] = useState(false);
  const [visible, setVisible] = useState(false); // Controls visibility

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

  return (
    <div>
      <h1>Theaters</h1>
      {visible && (
        <div>
          <h2>Please select your address or desired theater!</h2>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Theater
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTheater}
              onChange={handleChange}
              label="Select Theater"
            >
              {theaters.map((theater) => (
                <MenuItem key={theater.id} value={theater.id}>
                  {theater.name} - {theater.address}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default TheaterList;
