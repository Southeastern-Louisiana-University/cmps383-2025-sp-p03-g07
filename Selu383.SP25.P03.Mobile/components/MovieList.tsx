import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';

interface MovieDto {
  id: number;
  title: string;
  genre: string;
  duration: number;
  showtimes: ShowtimeDto[];
  imageUrl: string;
}

interface ShowtimeDto {
  id: number;
  time: string;
}

const API_URL = 'https://kingfish-actual-probably.ngrok-free.app/api/movies';

const MovieList = () => {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error fetching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.header}>Movies</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.movieImage} />
            )}

            <View style={styles.movieTextContainer}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieDetails}>Genre: {item.genre}</Text>
              <Text style={styles.movieDetails}>Duration: {item.duration} minutes</Text>
              {item.showtimes.map((showtime) => (
                <Text style={styles.showtime} key={showtime.id}>- {showtime.time}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  movieContainer: {
    flexDirection: 'row', 
    marginVertical: 10,
    backgroundColor: '#121212', 
    padding: 10,
    borderRadius: 8,
  },
  movieImage: {
    width: 120, 
    height: 180, 
    borderRadius: 10,
    marginRight: 15, 
  },
  movieTextContainer: {
    flex: 1, 
    justifyContent: 'center', 
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
    marginBottom: 5,
  },
  movieDetails: {
    color: 'white', 
  },
  showtime: {
    color: 'white', 
  },
});

export default MovieList;
