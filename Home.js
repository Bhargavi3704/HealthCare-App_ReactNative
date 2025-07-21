import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJk-ijRB_BPwJHcBC6FdinircAPdW6aHY3A&s';

const features = [
  {
    name: 'Doctors',
    icon: 'hand-heart-outline',
    screen: 'DoctorsCategoriesScreen',
    color: '#e5f8dc',
  },
  {
    name: 'Appointments',
    icon: 'calendar-clock-outline',
    screen: 'AppointmentsScreen',
    color: '#fef6e4',
  },
  {
    name: 'Reports',
    icon: 'file-outline',
    screen: 'ReportsScreen',
    color: '#e8f5ff',
  },
  {
    name: 'Health Tracker',
    icon: 'heart-pulse',
    screen: 'HealthTrackerScreen',
    color: '#fde2e4',
  },
  {
    name: 'Consultation',
    icon: 'video',
    screen: 'VideocallBooking',
    color: '#e0fbfc',
  },
  {
    name: 'Reminders',
    icon: 'alarm',
    screen: 'ReminderScreen',
    color: '#ede7f6',
  },
  {
    name: 'Medicine',
    icon: 'pill',
    screen: 'MedicineScreen',
    color: '#f3e5f5',
  },
];

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loadUserData = async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    };
    loadUserData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Image source={{ uri: user?.photo || DEFAULT_IMAGE }} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.username}>{user?.name}</Text>
        </View>
      </View>

      <FlatList
        data={features}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={43} color="#007AFF" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  profileBox: {
    backgroundColor: '#d5f3ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 25,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  card: {
    width: '47%',
    marginBottom: 25,
    marginHorizontal: '1.5%',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
