import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button, Image } from 'react-native';

const NUM_ROWS = 5;
const SEATS_PER_ROW = 6;

const Seating = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSeatPress = (seatId: string) => {
    setSelectedSeat(seatId);
    setModalVisible(true);
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 0; row < NUM_ROWS; row++) {
      const seatRow = [];
      for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seatRow.push(
          <TouchableOpacity
            key={seatId}
            style={styles.seat}
            onPress={() => handleSeatPress(seatId)}
          >
            <Text style={styles.seatText}>{seatId}</Text>
          </TouchableOpacity>
        );
      }
      seats.push(
        <View key={row} style={styles.row}>
          {seatRow}
        </View>
      );
    }

    return seats;
  };

  return (
    <View style={styles.container}>
      {/* Box representing the Movie Screen */}
      <View style={styles.screenBox}>
        <Text style={styles.screenText}>This is where the screen of the movie is</Text>
      </View>

      {/* Image of the Screen */}
      <Image
        source={{ uri: 'https://example.com/screen-image.jpg' }} // Replace this URL with your screen image
        style={styles.screenImage}
      />

      <Text style={styles.title}>Select Your Seat</Text>
      {renderSeats()}

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>Buy seat {selectedSeat}?</Text>
            <Button title="Confirm" onPress={() => {
              // You can add API logic here to reserve/purchase
              alert(`Seat ${selectedSeat} purchased!`);
              setModalVisible(false);
            }} />
            <View style={{ marginTop: 10 }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Seating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 60,
    alignItems: 'center',
  },
  screenBox: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  screenText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  screenImage: {
    width: '100%',
    height: 50, // Adjust this as needed to fit the screen size
    marginBottom: 20,
    resizeMode: 'contain', // Ensures the image fits nicely
  },
  title: {
    fontSize: 22,
    color: 'white',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  seat: {
    width: 40,
    height: 40,
    backgroundColor: '#3a3a3a',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
