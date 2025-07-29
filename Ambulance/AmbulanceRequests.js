import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const sampleRequests = [
  { id: '1', name: 'John Doe', location: 'Village Road', time: '2 mins ago' },
  { id: '2', name: 'Priya Sharma', location: 'Main Street', time: '5 mins ago' },
];

const AmbulanceRequests = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Incoming Requests</Text>
      </View>

      <FlatList
        data={sampleRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="ambulance" size={30} color="#007AFF" />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subText}>{item.location} • {item.time}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AmbulanceRequests;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5fbff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20,marginTop:25},
  title: { fontSize: 19, fontWeight: 'bold', marginLeft: 12, color: '#007AFF' },
  card: {
    backgroundColor: '#e0f7fa',
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
