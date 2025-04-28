import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ROOMS = [
  { id: 1, name: 'IMAX' },
  { id: 2, name: 'ScreenX' },
  { id: 3, name: '4DX' },
  { id: 4, name: 'RealD 3D' },
];

export default function RoomPage() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();
  
 
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95, 
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, 
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick a Screen for: {movie}</Text>
      
      <Text style={styles.description}>
        Choose the best viewing experience for your movie! Each screen offers a unique way to enjoy your film.
      </Text>

      <View style={styles.roomsContainer}>
        {ROOMS.map((room) => (
          <Animated.View
            key={room.id}
            style={[styles.item, { transform: [{ scale }] }]} 
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.button}
              onPress={() => router.push(`/seating?movie=${encodeURIComponent(String(movie))}&room=${room.id}`)}
            >
              <Text style={styles.roomText}>{room.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f3fc',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a3e8d', 
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#5d4e85', 
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  roomsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 18,
    backgroundColor: '#7a4dff', 
    borderRadius: 20,
    shadowColor: '#6a3e8d', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 30,
    backgroundColor: '#7a4dff', 
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roomText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', 
  },
});
