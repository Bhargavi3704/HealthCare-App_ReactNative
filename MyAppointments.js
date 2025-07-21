import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MyAppointments = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const stored = await AsyncStorage.getItem('appointments');
        if (stored) {
          setAppointments(JSON.parse(stored));
        }
      } catch (error) {
        console.log("Error reading appointments:", error);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchAppointments);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialist}>{item.specialist}</Text>
        <Text style={styles.dateTime}>{item.date} at {item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Appointments</Text>
      </View>

      {appointments.length === 0 ? (
        <Text style={styles.noData}>No appointments booked yet.</Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default MyAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fbff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  headerText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 10,
  },
  noData: {
    fontSize: 16,
    color: '#999',
    marginTop: 50,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialist: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  dateTime: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});
