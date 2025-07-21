import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,ActivityIndicator,PermissionsAndroid,Platform,Alert,TouchableOpacity} from 'react-native';
import Fitness from '@ovalmoney/react-native-fitness';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HealthTrackerScreen = ({navigation}) => {
  const [steps, setSteps] = useState(null);
  const [calories, setCalories] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [sleep, setSleep] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: 'Activity Recognition Permission',
            message: 'This app needs access to your fitness data.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Activity recognition permission is required.');
          return;
        }
      }

      fetchData();
    } catch (error) {
      console.error('Init Error:', error);
    }
  };

  const fetchData = async () => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();

    try {
      const stepData = await Fitness.getSteps({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      const calorieData = await Fitness.getCalories({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      const heartRateData = await Fitness.getHeartRate({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      const sleepData = await Fitness.getSleepAnalysis({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      });

      setSteps(
        Array.isArray(stepData)
          ? stepData.reduce((sum, entry) => sum + (entry?.value || 0), 0)
          : 0
      );

      setCalories(
        Array.isArray(calorieData)
          ? calorieData.reduce((sum, entry) => sum + (entry?.value || 0), 0)
          : 0
      );

      setHeartRate(
        Array.isArray(heartRateData) && heartRateData.length > 0
          ? heartRateData[0]?.value || 'N/A'
          : 'N/A'
      );

      setSleep(
        Array.isArray(sleepData) && sleepData.length > 0
          ? formatSleepHours(sleepData)
          : 'N/A'
      );
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Google Fit Error', 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const formatSleepHours = (data) => {
    const totalMillis = data.reduce((sum, entry) => {
      const start = new Date(entry.startDate);
      const end = new Date(entry.endDate);
      return sum + (end - start);
    }, 0);
    const hours = Math.floor(totalMillis / (1000 * 60 * 60));
    const minutes = Math.floor((totalMillis % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hr ${minutes} min`;
  };

  const renderCard = (icon, label, value, unit) => (
    <View style={styles.card} key={label}>
      <Icon name={icon} size={28} color="#007AFF" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>
        {label}
        {unit ? ` (${unit})` : ''}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Health</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {renderCard('walk', 'Steps', steps || 0)}
          {renderCard('fire', 'Calories', calories?.toFixed(0) || 0, 'kcal')}
          {renderCard('heart-pulse', 'Heart Rate', heartRate, 'bpm')}
          {renderCard('sleep', 'Sleep', sleep)}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HealthTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop:20,
  },
  backIcon: {
    marginRight: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    backgroundColor: '#d5f3ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
