import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings = ({ navigation }) => {
  const handleOptionPress = (label) => {
    switch (label) {
      case 'Edit Profile':
        navigation.navigate('EditProfile');
        break;
      case 'Notifications':
        navigation.navigate('Notifications');
        break;
      case 'Privacy Policy':
        navigation.navigate('PrivacyPolicy');
        break;
      case 'Logout':
        Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('userData'); // or whatever key you're using
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (error) {
                Alert.alert('Error', 'Failed to logout. Please try again.');
                console.error('Logout Error:', error);
              }
            },
          },
        ]);
        break;
    }
  };

  const Section = ({ title, options }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsBox}>
        {options.map((label, index) => (
          <TouchableOpacity
            key={label}
            onPress={() => handleOptionPress(label)}
            style={[
              styles.optionRow,
              index === options.length - 1 && styles.lastOptionRow,
            ]}
          >
            <Text style={styles.optionText}>{label}</Text>
            <Icon name="chevron-right" size={22} color="#888" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Settings</Text>

        <Section
          title="Account"
          options={['Edit Profile']}
        />

        <Section
          title="App Preferences"
          options={['Notifications']}
        />

        <Section
          title="Security & Privacy"
          options={['Privacy Policy']}
        />

        <Section
          title="Logout"
          options={['Logout']}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  optionsBox: {
    backgroundColor: '#d5f3ff',
    borderRadius: 12,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#007AFF',
  },
  lastOptionRow: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
