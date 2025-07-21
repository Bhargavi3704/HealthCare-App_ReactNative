import React, { useEffect, useState } from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,Alert,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const medicinesList = [
    {
        id: '1',
        name: 'Paracetamol',
        price: 25,
        image: 'https://5.imimg.com/data5/SELLER/Default/2022/9/IV/UY/CG/75459511/500mg-paracetamol-tablet.jpg',
    },
    {
        id: '2',
        name: 'Amoxicillin',
        price: 50,
        image: 'https://www.shutterstock.com/image-photo/illustration-picture-shows-box-containing-600nw-2232124899.jpg',
    },
    {
        id: '3',
        name: 'Cetrizine',
        price: 10,
        image: 'https://www.albionbd.com/wp-content/uploads/2021/08/Cetirizine-Tablet.jpg',
    },
    {
        id: '4',
        name: 'Dolo 650',
        price: 20,
        image: 'https://www.shutterstock.com/editorial/image-editorial/MeT3I540OdD0E8weNDIwMzI=/dolo-650-paracetamol-tablet-recorded-most-prescribed-1500w-12773147c.jpg',
    },
    {
        id: '5',
        name: 'Combiflam',
        price: 30,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXwRWAvNNnlu4DIago8jdTWEaboOxCOLiRg&s',
    },
    {
        id: '6',
        name: 'Azithromycin',
        price: 60,
        image: 'https://www.biofieldpharma.com/wp-content/uploads/2023/06/BIOFIELD-OZISET-500-TAB-1-scaled.jpg',
    },
];

const MedicineScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (medicine) => {
        try {
            const storedCart = await AsyncStorage.getItem('cart');
            const currentCart = storedCart ? JSON.parse(storedCart) : [];

            const alreadyInCart = currentCart.some((item) => item.id === medicine.id);
            if (alreadyInCart) {
                Alert.alert('Already in Cart', `${medicine.name} is already in your cart.`);
                return;
            }

            const updatedCart = [...currentCart, { ...medicine }];
            await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            Alert.alert('Added', `${medicine.name} added to cart.`);
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Available Medicines</Text>
                <TouchableOpacity
                    style={styles.cartIcon}
                    onPress={() => navigation.navigate('CartScreen')}
                >
                    <Icon name="cart-outline" size={26} color="#007AFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={medicinesList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.medicineImage} />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>₹{item.price}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => addToCart(item)}
                        >
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default MedicineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7f7ff',
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
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,
    },
    cartIcon: {
  marginLeft: 'auto',
},
});
