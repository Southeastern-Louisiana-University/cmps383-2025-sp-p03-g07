import { useState, useEffect } from "react";
import axios from "axios";
import { Theater } from "./types"; // Import the Theater type

const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState(false);
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
    axios
      .get<Theater[]>("https://localhost:7027/api/theaters")
      .then((response) => setTheaters(response.data))
      .catch((error) => console.error("Error fetching theaters:", error));
  }, []);

  return (
    <div>
      <h1>Theaters</h1>
      <button onClick={fetchTheaters} disabled={loading}>
        {loading ? "Loading..." : "Fetch Theaters"}
      </button>

      {visible && (
        <div>
          <ul>
            {theaters.map((theater) => (
              <li key={theater.id}>
                {theater.name} (ID: {theater.id})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TheaterList;
