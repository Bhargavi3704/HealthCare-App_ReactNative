import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMAGE = 'https://cdn-icons-png.flaticon.com/512/2967/2967498.png';

const ambulanceFeatures = [
  {
    name: 'Incoming Requests',
    icon: 'ambulance',
    screen: 'AmbulanceRequests',
    color: '#e0f7fa',
  },
  {
    name: 'Ride History',
    icon: 'history',
    screen: 'AmbulanceHistory',
    color: '#fde2e4',
  },
  {
    name: 'Map & Tracking',
    icon: 'map-marker-path',
    screen: 'AmbulanceMapScreen',
    color: '#f3f7e4',
  },
];

const AmbulanceHome = ({ navigation }) => {
  const [ambulanceUser, setAmbulanceUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setAmbulanceUser(JSON.parse(stored));
      }
    };
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AmbulanceProfile')}>
          <Image
            source={{ uri: ambulanceUser?.photo || DEFAULT_IMAGE }}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerWelcome}>Welcome,</Text>
          <Text style={styles.headerName}>
            {ambulanceUser?.name || 'Driver Name'}
          </Text>
        </View>
      </View>

      {/* Feature Cards */}
      <FlatList
        data={ambulanceFeatures}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={40} color="#007AFF" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AmbulanceHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 25,
    backgroundColor: '#d5f3ff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerWelcome: {
    fontSize: 16,
    color: '#666',
  },
  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
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
