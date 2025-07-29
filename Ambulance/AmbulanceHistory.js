import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const rideHistory = [
  { id: '1', name: 'Anil Reddy', date: '28 July 2025', location: 'City Center' },
  { id: '2', name: 'Suman Yadav', date: '27 July 2025', location: 'B Block' },
];

const AmbulanceHistory = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Ride History</Text>
      </View>

      <FlatList
        data={rideHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="history" size={30} color="#007AFF" />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subText}>{item.location} • {item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AmbulanceHistory;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fbff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20,marginTop:25},
  title: { fontSize: 19, fontWeight: 'bold', marginLeft: 12, color: '#007AFF' },
  card: {
    backgroundColor: '#fde2e4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  textContainer: { marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  subText: { fontSize: 14, color: '#555' },
});
