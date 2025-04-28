import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

type Item = {
  id: number;
  name: string;
  price: number;
  emoji: string;
};

export default function ConfirmationPage() {
  const { cart } = useLocalSearchParams();
  const [parsedCart, setParsedCart] = useState<Item[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Parse the cart string to an array of items
    if (cart) {
      try {
        setParsedCart(JSON.parse(cart as string));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, [cart]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Your Purchase</Text>

      {/* Concession Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items in Your Cart</Text>
        <FlatList
          data={parsedCart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.emoji} {item.name} - ${item.price}</Text>
            </View>
          )}
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          // Handle purchase confirmation
          alert('Your order has been placed!');
          router.back(); // Go back to the previous screen
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm Purchase</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FF6347', // A red color to make the button stand out
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
