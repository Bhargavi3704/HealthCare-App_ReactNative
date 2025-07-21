import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Alert,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cart');
                const cartData = storedCart ? JSON.parse(storedCart) : [];
                setCartItems(cartData);
            } catch (error) {
                console.error('Error fetching cart items', error);
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchCartItems);
        return unsubscribe;
    }, [navigation]);

    const toggleSelectItem = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
    };

    const handleOrder = async () => {
        if (selectedItems.length === 0) {
            Alert.alert('No items selected', 'Please select items to order.');
            return;
        }

        try {
            const selectedData = cartItems
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => ({
                    ...item,
                    orderTime: new Date().toISOString(),
                    quantity: 1,
                }));

            const remainingData = cartItems.filter(
                (item) => !selectedItems.includes(item.id)
            );

            await AsyncStorage.setItem('cart', JSON.stringify(remainingData));

            await AsyncStorage.setItem('orders', JSON.stringify(selectedData));

            setCartItems(remainingData);
            setSelectedItems([]);

            navigation.navigate('PaymentScreen');
        } catch (error) {
            console.error('Error handling order', error);
        }
    };

    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item.id);
        return (
            <TouchableOpacity
                onPress={() => toggleSelectItem(item.id)}
                style={[styles.card, isSelected && styles.selectedCard]}
            >
                <Image source={{ uri: item.image }} style={styles.medicineImage} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Cart</Text>
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Cart is empty.</Text>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {cartItems.length > 0 && (
                <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
                    <Text style={styles.orderButtonText}>Select Order</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default CartScreen;

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
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 12,
        color: '#333',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 12,
        marginBottom: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
    },
    selectedCard: {
        backgroundColor: '#D0F0FF',
    },
    medicineImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
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
    orderButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 80,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 50,
        fontSize: 16,
    },
});
