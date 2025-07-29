import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const patients = [
  { id: '1', name: 'Anita Sharma', age: 28, condition: 'Fever' },
  { id: '2', name: 'Ravi Kumar', age: 35, condition: 'Diabetes' },
];

const PatientList = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Patient List</Text>
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.details}>Age: {item.age} | Condition: {item.condition}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PatientList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    padding: 16,
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
});
