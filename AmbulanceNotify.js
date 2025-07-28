import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AmbulanceNotify = () => {
  const navigation = useNavigation();

  const statuses = [
    { status: 'Request Sent', icon: 'send', time: '12:05 PM' },
    { status: 'Ambulance Dispatched', icon: 'truck-check', time: '12:06 PM' },
    { status: 'En Route', icon: 'map-marker-path', time: '12:08 PM' },
    { status: 'Arrived at Location', icon: 'map-marker-check', time: '12:15 PM' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Ambulance Notification</Text>
        <View style={{ width: 26 }} /> {/* Placeholder to balance spacing */}
      </View>

      <ScrollView style={styles.statusContainer}>
        {statuses.map((item, index) => (
          <View key={index} style={styles.statusCard}>
            <Icon name={item.icon} size={26} color="#007AFF" />
            <View style={styles.statusText}>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AmbulanceNotify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f9ff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
  },
  statusContainer: {
    marginTop: 10,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  statusText: {
    marginLeft: 15,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  time: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});
