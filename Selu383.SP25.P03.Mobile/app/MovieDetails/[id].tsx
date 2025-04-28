import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type Movie = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  genre: string;
  runtimeMinutes: number;
  rating: number;
};

const API_URL = `https://cmps383-sp25-p03-g07.azurewebsites.net/api/movies/`;

function MovieDetails() {
  const { id } = useLocalSearchParams(); // Get movie ID from URL params
  
  const [movie, setMovie] = useState<Movie | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      console.log(`Fetching movie with ID: ${id}`);
      fetch(`${API_URL}${id}`)  // Using the API_URL constant here
        .then((res) => {
          console.log("Response Status:", res.status); // Check response status
          return res.json();
        })
        .then((data) => {
          console.log("Fetched Movie Data:", data); // Log fetched data
          setMovie(data);
        })
        .catch((err) => console.error("Failed to fetch movie:", err));
    }
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      {movie.imageUrl && (
        <Image source={{ uri: movie.imageUrl }} style={styles.image} />
      )}
      <Text>{movie.description}</Text>
      <Text style={styles.boldText}>Genre: {movie.genre}</Text>
      <Text style={styles.boldText}>Runtime: {movie.runtimeMinutes} minutes</Text>
      <Text style={styles.boldText}>Rating: {movie.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default MovieDetails;
