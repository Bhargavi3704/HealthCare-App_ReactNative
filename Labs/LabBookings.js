import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockBookings = [
    { id: '1', test: 'Blood Test', patient: 'Aarav Singh', date: '2025-07-30' },
    { id: '2', test: 'X-Ray', patient: 'Diya Mehra', date: '2025-07-31' },
];

const LabBookings = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Lab Bookings</Text>
            </View>
            <FlatList
                data={mockBookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.testName}>{item.test}</Text>
                        <Text style={styles.details}>Patient: {item.patient}</Text>
                        <Text style={styles.details}>Date: {item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default LabBookings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fbff',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    card: {
        backgroundColor: '#e6f2ff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    testName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    details: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
     header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:25,
  },
  backButton: {
    marginRight: 10,
  },
});
