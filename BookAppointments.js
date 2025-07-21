import React, { useState } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const BookAppointments = ({ route, navigation }) => {
  const { doctor } = route.params;

  const [selectedDate, setSelectedDate] = useState('15 Jul');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [report, setReport] = useState(null);

  const visitDates = ['15 Jul', '16 Jul', '17 Jul', '18 Jul','19 Jul'];
  const visitTimes = ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'];

  const pickReport = () => {
    Alert.alert("Choose File", "Pick from:", [
      {
        text: "Camera",
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode) {
              const file = response.assets[0];
              setReport(file);
            }
          });
        },
      },
      {
        text: "Gallery",
        onPress: () => {
          launchImageLibrary({ mediaType: 'mixed', selectionLimit: 1 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
              const file = response.assets[0];
              setReport(file);
            }
          });
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleBooking = async () => {
    try {
      const newAppointment = {
        id: Date.now().toString(),
        name: doctor.name,
        specialist: doctor.specialist,
        image: doctor.image,
        date: selectedDate,
        time: selectedTime,
        report: report?.uri || null,
      };

      const existing = await AsyncStorage.getItem('appointments');
      const existingAppointments = existing ? JSON.parse(existing) : [];

      const updatedAppointments = [...existingAppointments, newAppointment];
      await AsyncStorage.setItem('appointments', JSON.stringify(updatedAppointments));

      Alert.alert("Booked!", "Appointment successfully booked.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("MyAppointments"),
        },
      ]);
    } catch (error) {
      console.log("Storage error:", error);
      Alert.alert("Error", "Failed to save appointment.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={26} color="#007AFF" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Image source={doctor.image} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialist}>{doctor.specialist}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Choose Date</Text>
      <View style={styles.optionRow}>
        {visitDates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.optionButton,
              selectedDate === date && styles.selectedOption,
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={styles.optionText}>{date}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Choose Time</Text>
      <View style={styles.optionRow}>
        {visitTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.optionButton,
              selectedTime === time && styles.selectedOption,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.optionText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Visit Type</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={pickReport}>
        <View style={styles.uploadRow}>
          <Icon name="file-upload-outline" size={20} color="#007AFF" style={{ marginRight: 8 }} />
          <Text style={styles.uploadText}>
            {report ? report.fileName || "Report Uploaded" : "Upload Report"}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBox}>
        <Text style={{ color: '#007AFF', fontWeight: '600' }}>Patient Info</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookAppointments;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fbff',
  },
  backButton: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#eaf4ff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    color: '#333',
    fontWeight: '500',
  },
  uploadBox: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
