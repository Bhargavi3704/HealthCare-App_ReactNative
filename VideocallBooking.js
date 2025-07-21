import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const VideocallBooking = ({ route, navigation }) => {
  const doctor = route?.params?.doctor || {
    name: 'General Consultation',
    about: 'Please select a doctor below for a personalized video consultation.',
    image: {
      uri: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
    },
  };

  const handleVideoCall = () => {
    const meetLink = 'https://meet.google.com/abc-defg-hij';
    Linking.openURL(meetLink);
  };

  const handleSelectDoctor = () => {
    navigation.navigate('DoctorsList');
  };

  const isGeneral = !route?.params?.doctor;

  return (
    <View style={styles.container}>
      <Image source={doctor.image} style={styles.avatar} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.about}>{doctor.about}</Text>

      {isGeneral ? (
        <TouchableOpacity style={styles.button} onPress={handleSelectDoctor}>
          <Text style={styles.buttonText}>Select Doctor</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleVideoCall}>
          <Text style={styles.buttonText}>Start Video Call</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideocallBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  about: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center', 
    marginVertical: 15,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});