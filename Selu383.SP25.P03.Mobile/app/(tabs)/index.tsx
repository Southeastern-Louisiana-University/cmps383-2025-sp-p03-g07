import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MovieList from '@/components/MovieList';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon library

const API_URL = 'https://kingfish-actual-probably.ngrok-free.app/api/theaters';

interface TheaterDto {
  id: number;
  name: string;
  address: string;
  seatCount: number;
  managerId: number | null;
}

export default function HomeScreen() {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null); // Selected theater state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTheaters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setTheaters(response.data);
    } catch (error) {
      console.error('Error fetching theaters:', error);
      setError('Error fetching theaters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Theaters Section */}
      <ThemedText type="title">Select a Theater</ThemedText>

      {/* Dropdown to select theater */}
      {loading ? (
        <Text>Loading theaters...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <View style={styles.dropdownContainer}>
          <Icon name="location-arrow" size={20} color="#000" style={styles.icon} />
          <Picker
            selectedValue={selectedTheater}
            onValueChange={(itemValue) => setSelectedTheater(itemValue)}
            style={{ height: 50, width: '80%' }}
          >
            <Picker.Item label="Select a theater" value={null} />
            {theaters.map((theater) => (
              <Picker.Item key={theater.id} label={theater.name} value={theater.id} />
            ))}
          </Picker>
        </View>
      )}

      {/* Movies Section */}
      <ThemedText type="title">Movies</ThemedText>
      <MovieList /> {/* Display the list of movies */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});
