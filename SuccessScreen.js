import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SuccessScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await saveOrder();
      setLoading(false);
    }, 2000); // simulate payment processing

    return () => clearTimeout(timer);
  }, []);

  const saveOrder = async () => {
    try {
      const paidItemsJSON = await AsyncStorage.getItem('PAID_ITEMS');
      const existingOrdersJSON = await AsyncStorage.getItem('ORDERS');

      const paidItems = paidItemsJSON ? JSON.parse(paidItemsJSON) : [];
      const existingOrders = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];

      const updatedOrders = [...existingOrders, ...paidItems];

      await AsyncStorage.setItem('ORDERS', JSON.stringify(updatedOrders));
      await AsyncStorage.removeItem('PAID_ITEMS'); // clear after saving
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>Processing your payment...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Payment Successful!</Text>
      <Text style={styles.message}>Your order has been placed successfully.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#00b894' }]}
        onPress={() => navigation.navigate('PreviousOrdersScreen')}
      >
        <Text style={styles.buttonText}>View Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7f7ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#e7f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
