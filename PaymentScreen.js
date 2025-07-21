import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        const parsed = storedOrders ? JSON.parse(storedOrders) : [];
        setOrders(parsed);

        const total = parsed.reduce((sum, item) => {
          const qty = item.quantity || 1;
          return sum + item.price * qty;
        }, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching orders for payment', error);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = async () => {
  try {
    // Store to confirmedOrders
    const existingConfirmed = await AsyncStorage.getItem('confirmedOrders');
    const confirmed = existingConfirmed ? JSON.parse(existingConfirmed) : [];
    const updatedConfirmed = [...confirmed, ...orders];
    await AsyncStorage.setItem('confirmedOrders', JSON.stringify(updatedConfirmed));

    // Store to previousOrders
    const existingPrevious = await AsyncStorage.getItem('previousOrders');
    const previous = existingPrevious ? JSON.parse(existingPrevious) : [];
    const updatedPrevious = [...previous, ...orders];
    await AsyncStorage.setItem('previousOrders', JSON.stringify(updatedPrevious));

    // Clear current session orders
    await AsyncStorage.removeItem('orders');

    // Navigate to success screen
    navigation.replace('SuccessScreen');
  } catch (error) {
    console.error('Error during payment:', error);
  }
};


  const renderItem = ({ item }) => {
    const qty = item.quantity || 1;
    const subtotal = qty * item.price;

    return (
      <View style={styles.itemRow}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            ₹{item.price} × {qty} = ₹{subtotal}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Payment</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items for payment.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Mode:</Text>
        <View style={styles.modeRow}>
          {['UPI', 'Card', 'Cash'].map((mode) => (
            <TouchableOpacity
              key={mode}
              style={[
                styles.modeBtn,
                paymentMode === mode && styles.modeSelected,
              ]}
              onPress={() => setPaymentMode(mode)}
            >
              <Text
                style={[
                  styles.modeText,
                  paymentMode === mode && styles.modeTextSelected,
                ]}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estimated Delivery:</Text>
        <Text style={styles.deliveryTime}>Tomorrow, 9:00 AM – 12:00 PM</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address:</Text>
        <TextInput
          style={styles.addressInput}
          placeholder="Enter delivery address"
          multiline
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {orders.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total: ₹{totalAmount}</Text>
          <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
            <Text style={styles.payBtnText}>Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FCFF',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20,
  },
  headerText: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeBtn: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modeSelected: {
    backgroundColor: '#007AFF',
  },
  modeText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  modeTextSelected: {
    color: '#fff',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#333',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  footer: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  payBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  payBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
