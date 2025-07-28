import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AmbulanceScreen = ({ navigation }) => {
  const handleCall = () => {
    Linking.openURL('tel:102');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("AmbulanceNotify")}>
          <Icon name="bell-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Location Box */}
      <View style={styles.locationCard}>
        <Text style={styles.locationLabel}>Enter your location</Text>
        <TextInput
          style={styles.input}
          placeholder="Shoppers Plaza-4, C.G Road, Ahmedabad."
          placeholderTextColor="#999"
        />
      </View>

      {/* Ambulance Image */}
      <Image
        source={require('../Images/ambulance.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Call Info */}
      <Text style={styles.title}>Call Ambulance</Text>
      <Text style={styles.description}>
        In case of emergency, just press the Call Ambulance button to alert the
        nearby ambulance to arrive at your location.
      </Text>

      {/* Call Button */}
      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Icon name="phone" size={20} color="#fff" />
        <Text style={styles.callButtonText}>Call Ambulance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f9ff',
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  locationCard: {
    backgroundColor: '#007AFF',
    marginTop: 25,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  locationLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    color: '#000',
    fontSize: 15,
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
