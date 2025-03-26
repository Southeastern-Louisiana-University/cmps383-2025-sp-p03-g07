import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TheaterList from '@/components/TheaterList';
import MovieList from '@/components/MovieList';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Theaters Section */}
      <ThemedText type="title">Theaters</ThemedText>
      <TheaterList /> {/* Display the list of theaters */}

      {/* Movies Section */}
      <ThemedText type="title">Movies</ThemedText>
      <MovieList />  {/* Display the list of movies */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,  // Add some spacing between sections
  },
});
