import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,StyleSheet,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PreviousOrdersScreen = ({navigation}) => {
    const [previousOrders, setPreviousOrders] = useState([]);

    useEffect(() => {
        const loadPreviousOrders = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('previousOrders');
                const data = jsonValue != null ? JSON.parse(jsonValue) : [];
                setPreviousOrders(data);
            } catch (error) {
                console.error('Failed to load previous orders:', error);
            }
        };

        loadPreviousOrders();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                </Text>
                <Text style={styles.qty}>Qty: {item.quantity || 1}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Previous Orders</Text>
            </View>

            {previousOrders.length === 0 ? (
                <Text style={styles.empty}>No previous orders found.</Text>
            ) : (
                <FlatList
                    data={previousOrders}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

export default PreviousOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0fbff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
    empty: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 40,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 12,
    },
    details: {
        justifyContent: 'space-around',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    price: {
        fontSize: 15,
        color: '#007AFF',
    },
    qty: {
        fontSize: 14,
        color: '#555',
    },
});
