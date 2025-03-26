import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface MovieDto {
  id: number;
  title: string;
  genre: string;
  duration: number;
  showtimes: ShowtimeDto[]; // Nested array of showtimes
}

interface ShowtimeDto {
  id: number;
  time: string;
}

const API_URL = 'https://kingfish-actual-probably.ngrok-free.app/api/movies'; // Movies API endpoint

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
    fetchMovies(); // Fetch movies when the component mounts
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Movies</Text>
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>} 

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            {item.showtimes.map((showtime) => (
              <Text key={showtime.id}>- {showtime.time}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default MovieList;
