import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button, Linking } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type Movie = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  genre: string;
  runtimeMinutes: number;
  rating: number;
  trailerUrl?: string; // Adding trailer URL field
};

const API_URL = `https://cmps383-sp25-p03-g07.azurewebsites.net/api/movies/`;

function MovieDetails() {
  const { id } = useLocalSearchParams(); // Get movie ID from URL params
  
  const [movie, setMovie] = useState<Movie | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
        })
        .catch((err) => console.error("Failed to fetch movie:", err));
    }
  }, [id]);

  if (!movie) return <Text style={styles.loadingText}>Loading...</Text>;

  const handleTrailerPress = () => {
    if (movie.trailerUrl) {
      Linking.openURL(movie.trailerUrl).catch(err => console.error("Failed to open trailer URL", err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      {movie.imageUrl && (
        <Image source={{ uri: movie.imageUrl }} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.description}>{movie.description}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Genre: <Text style={styles.infoValue}>{movie.genre}</Text></Text>
        <Text style={styles.infoText}>Runtime: <Text style={styles.infoValue}>{movie.runtimeMinutes} minutes</Text></Text>
        <Text style={styles.infoText}>Rating: <Text style={styles.infoValue}>{movie.rating}</Text></Text>
      </View>

      {/* Trailer Button */}
      {movie.trailerUrl && (
        <View style={styles.buttonContainer}>
          <Button title="Watch Trailer" onPress={handleTrailerPress} color="#1E90FF" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  infoValue: {
    fontWeight: "bold",
    color: "#1E90FF", // Accent color for values
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 30, // Space for button at the bottom
  },
});

export default MovieDetails;
