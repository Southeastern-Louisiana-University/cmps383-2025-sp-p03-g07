import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface TheaterDto {
  id: number;
  name: string;
  address: string;
  seatCount: number;
  managerId: number | null;
}


const baseUrl = 'https://cmps383-sp25-p03-g07.azurewebsites.net/';

const TheaterList = () => {
  const [theaters, setTheaters] = useState<TheaterDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTheaters = async () => {
    setLoading(true);
    setError(null);

 
    const url = `${baseUrl}api/theaters/`;

    try {

      const response = await axios({
        method: 'get',
        url: url,
      });

      console.log('Fetched Theater Data:', response.data);  

      if (Array.isArray(response.data)) {
        setTheaters(response.data);
      } else {
        setError('No theaters found.');
      }
    } catch (error) {
      console.error('Error fetching theaters:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response Error:', error.response.data); 
      }
      setError('Error fetching theaters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Theaters</Text>

      <Button title="Fetch Theaters" onPress={fetchTheaters} disabled={loading} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>} {/* Error message */}

      {theaters.length > 0 ? (
        <FlatList
          data={theaters}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text>{item.name} (ID: {item.id})</Text>
              <Text>{item.address}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No theaters found</Text>
      )}
    </View>
  );
};

export default TheaterList;
