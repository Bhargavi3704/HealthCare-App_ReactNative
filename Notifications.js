import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Notifications = ({ navigation }) => {
  const [notifications] = useState([
    { id: 1, message: 'Your appointment with Dr. Rao is confirmed.' },
    { id: 2, message: 'New health report uploaded by your doctor.' },
    { id: 3, message: 'Reminder: Take your medication at 8:00 PM.' },
    { id: 4, message: 'Your lab test result is ready to view.' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Notifications</Text>

        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationCard}>
            <Icon name="bell-ring-outline" size={22} color="#007AFF" style={{ marginRight: 10 }} />
            <Text style={styles.message}>{item.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationCard: {
    backgroundColor: '#d5f3ff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  message: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
});
