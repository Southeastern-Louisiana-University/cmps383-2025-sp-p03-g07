import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity, Modal, Button, Linking } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/core';

interface MovieDto {
  id: number;
  title: string;
  genre: string;
  duration: number;
  showtimes: ShowtimeDto[];
  imageUrl: string;
  trailerUrl: string;
}

interface ShowtimeDto {
  id: number;
  time: string;
}

const API_URL = 'https://cmps383-sp25-p03-g07.azurewebsites.net/api/movies/';

const MovieList = () => {
  const router = useRouter();
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDto | null>(null);

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

  const handleMoviePress = (movie: MovieDto) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);  
  };

  const handleWatchTrailer = (url: string) => {
    Linking.openURL(url);  
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setSelectedMovie(null);
      fetchMovies();
    }, [])
  );

  return (
    <View style={styles.container}>

      {loading && <ActivityIndicator size="large" color="#800080" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.movieContainer}
            onPress={() => handleMoviePress(item)}
          >
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
          </TouchableOpacity>
        )}
      />

      {/* Modal for Movie Details */}
      {selectedMovie && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
              <Image source={{ uri: selectedMovie.imageUrl }} style={styles.modalImage} />
              <Text style={styles.modalDetails}>Genre: {selectedMovie.genre}</Text>
              <Text style={styles.modalDetails}>Duration: {selectedMovie.duration} minutes</Text>
              <Text style={styles.modalDetails}>Showtimes:</Text>
              {selectedMovie.showtimes.map((showtime) => (
                <Text style={styles.modalShowtime} key={showtime.id}>{showtime.time}</Text>
              ))}

              {/* Watch Trailer Button inside the Modal */}
              <TouchableOpacity 
                style={styles.trailerButton}
                onPress={() => handleWatchTrailer(selectedMovie.trailerUrl)}
              >
                <Text style={styles.trailerButtonText}>Watch Trailer</Text>
              </TouchableOpacity>

              {/* More Details Button inside the Modal */}
              <TouchableOpacity
                style={styles.moreDetailsButton}
                onPress={() => router.push(`/MovieDetails/${selectedMovie.id}`)}
              >
                <Text style={styles.moreDetailsButtonText}>More Details</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <Button title="Close" onPress={handleCloseModal} />
                <Button
                  title="Get Your Ticket!"
                  onPress={() => {
                    setModalVisible(false);
                    router.push(`/room?movie=${encodeURIComponent(selectedMovie?.title ?? '')}`);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A3C', 
    padding: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#E9B6FF', 
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#FF6347',
    marginTop: 10,
    textAlign: 'center',
  },
  movieContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#2A2A6D',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  movieImage: {
    width: 130,
    height: 200,
    borderRadius: 10,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#E9B6FF',
  },
  movieTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  movieDetails: {
    color: '#D3D3D3',
    fontSize: 14,
  },
  showtime: {
    color: '#E9B6FF',
    fontSize: 14,
  },
  moreDetailsButton: {
    marginTop: 15,
    backgroundColor: '#E9B6FF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  moreDetailsButtonText: {
    color: '#1A1A3C',
    fontWeight: '700',
  },
  trailerButton: {
    marginTop: 15,
    backgroundColor: '#8A2BE2',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  trailerButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#3E2882',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E9B6FF',
    marginBottom: 10,
  },
  modalImage: {
    width: 180,
    height: 270,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDetails: {
    fontSize: 16,
    color: '#D3D3D3',
    marginVertical: 5,
  },
  modalShowtime: {
    fontSize: 14,
    color: '#E9B6FF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});

export default MovieList;
