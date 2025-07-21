import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,ScrollView,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fitness from '@ovalmoney/react-native-fitness';

const ReminderScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(null);
  const [calories, setCalories] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [sleep, setSleep] = useState(null);

  useEffect(() => {
    fetchAllData();
    const unsubscribe = navigation.addListener('focus', fetchAllData);
    return unsubscribe;
  }, [navigation]);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchAppointments(), fetchHealthData()]);
    setLoading(false);
  };

  const fetchAppointments = async () => {
    try {
      const data = await AsyncStorage.getItem('appointments');
      if (data) {
        setAppointments(JSON.parse(data));
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchHealthData = async () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    try {
      const stepData = await Fitness.getSteps({ startDate: start.toISOString(), endDate: end.toISOString() });
      const calorieData = await Fitness.getCalories({ startDate: start.toISOString(), endDate: end.toISOString() });
      const heartRateData = await Fitness.getHeartRate({ startDate: start.toISOString(), endDate: end.toISOString() });
      const sleepData = await Fitness.getSleepAnalysis({ startDate: start.toISOString(), endDate: end.toISOString() });

      setSteps(stepData.reduce((sum, entry) => sum + (entry?.value || 0), 0));
      setCalories(calorieData.reduce((sum, entry) => sum + (entry?.value || 0), 0));
      setHeartRate(heartRateData.length > 0 ? heartRateData[0]?.value : 'N/A');
      setSleep(formatSleepHours(sleepData));
    } catch (error) {
      console.error("Health data error:", error);
    }
  };

  const formatSleepHours = (data) => {
    if (!Array.isArray(data)) return 'N/A';
    const totalMillis = data.reduce((sum, entry) => {
      const start = new Date(entry.startDate);
      const end = new Date(entry.endDate);
      return sum + (end - start);
    }, 0);
    const hours = Math.floor(totalMillis / (1000 * 60 * 60));
    const minutes = Math.floor((totalMillis % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr ${minutes} min`;
  };

  const renderHealthReminder = (icon, label, value, unit) => (
    <View style={styles.card} key={label}>
      <Icon name={icon} size={28} color="#007AFF" />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value} {unit}</Text>
    </View>
  );

  const renderAppointment = (item, index) => (
    <View key={index} style={styles.appointmentCard}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dateTime}>{item.date} at {item.time}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>Reminders</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 40 }} />
      ) : (
        <>
          <Text style={styles.sectionTitle}>🩺 Health Tracker</Text>
          <View style={styles.grid}>
            {renderHealthReminder('walk', 'Steps', steps || 0)}
            {renderHealthReminder('fire', 'Calories', calories?.toFixed(0) || 0, 'kcal')}
            {renderHealthReminder('heart-pulse', 'Heart Rate', heartRate || 'N/A', 'bpm')}
            {renderHealthReminder('sleep', 'Sleep', sleep || 'N/A')}
          </View>

          <Text style={styles.sectionTitle}>📅 Appointments</Text>
          {appointments.length === 0 ? (
            <Text style={styles.emptyText}>No upcoming appointments.</Text>
          ) : (
            appointments.map(renderAppointment)
          )}

          <Text style={styles.sectionTitle}>🎥 Video Consultations</Text>
          {appointments.length === 0 ? (
            <Text style={styles.emptyText}>No video consultations yet.</Text>
          ) : (
            appointments.map(renderAppointment)
          )}
        </>
      )}
    </ScrollView>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#222',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#d5f3ff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 1,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 4,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTime: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 10,
  },
});
