import React from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const mockHistory = [
    { id: '1', test: 'ECG', patient: 'Rohit Verma', date: '2025-07-20', result: 'Normal' },
    { id: '2', test: 'MRI Scan', patient: 'Meera Das', date: '2025-07-18', result: 'Needs Review' },
];

const LabHistoryScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Lab History</Text>
            </View>
            <FlatList
                data={mockHistory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.testName}>{item.test}</Text>
                        <Text style={styles.details}>Patient: {item.patient}</Text>
                        <Text style={styles.details}>Date: {item.date}</Text>
                        <Text style={styles.result}>Result: {item.result}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default LabHistoryScreen;

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
        backgroundColor: '#f2f0ff',
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
        color: '#6a0dad',
    },
    details: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    result: {
        fontSize: 14,
        color: '#007B33',
        fontWeight: 'bold',
        marginTop: 6,
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
