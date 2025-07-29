import React from 'react';
import { View, Text, StyleSheet, FlatList ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const appointments = [
    { id: '1', patient: 'Anita Sharma', date: '30 July', time: '10:00 AM' },
    { id: '2', patient: 'Ravi Kumar', date: '30 July', time: '11:00 AM' },
];

const AppointmentDetails = ({navigation}) => {
    return (
        <View style={styles.container}>
           <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-left" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Today's Appointments</Text>
            </View>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.patient}</Text>
                        <Text style={styles.details}>{item.date} at {item.time}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default AppointmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fbff',
        padding: 16,
    },
    title: {
        fontSize: 19,
        fontWeight: '700',
        color: '#007AFF',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
        elevation: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    details: {
        fontSize: 14,
        color: '#666',
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
