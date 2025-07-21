import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Image,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderScreen = ({ navigation }) => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        setOrderItems(storedOrders ? JSON.parse(storedOrders) : []);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchOrders);
    return unsubscribe;
  }, [navigation]);

  const updateQuantity = async (index, action) => {
    const updatedItems = [...orderItems];
    const currentQty = updatedItems[index].quantity || 1;

    if (action === 'increase') {
      updatedItems[index].quantity = currentQty + 1;
    } else if (action === 'decrease' && currentQty > 1) {
      updatedItems[index].quantity = currentQty - 1;
    }

    setOrderItems(updatedItems);
    await AsyncStorage.setItem('orders', JSON.stringify(updatedItems));
  };

  const deleteOrderItem = async (index) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to remove this item from your orders?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedItems = [...orderItems];
            updatedItems.splice(index, 1);
            setOrderItems(updatedItems);
            await AsyncStorage.setItem('orders', JSON.stringify(updatedItems));
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.medicineImage} />
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => deleteOrderItem(index)}
      >
        <Icon name="delete-outline" size={22} color="#FF3B30" />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(index, 'decrease')}>
            <Text style={styles.qtyBtnText}>–</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{item.quantity || 1}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(index, 'increase')}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handlePayNow = () => {
    navigation.navigate('PaymentScreen', { from: 'orders' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      <FlatList
        data={orderItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders yet.</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {orderItems.length > 0 && (
        <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FCFF',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    position: 'relative',
  },
  medicineImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyBtn: {
    backgroundColor: '#E0F0FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 16,
  },
  payButton: {
    position: 'absolute',
    bottom:60,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
