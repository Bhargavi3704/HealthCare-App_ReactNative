import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,SafeAreaView,ScrollView,Alert,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJk-ijRB_BPwJHcBC6FdinircAPdW6aHY3A&s';

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem('userProfile');
        if (stored) {
          const data = JSON.parse(stored);
          setName(data.name || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setPhoto(data.photo || DEFAULT_IMAGE);
        } else {
          setPhoto(DEFAULT_IMAGE);
        }
      } catch (error) {
        console.log('Failed to load profile:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    const updatedProfile = {
      name,
      email,
      phone,
      photo: photo || DEFAULT_IMAGE,
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.heading}>Edit Profile</Text>

        <Image source={{ uri: photo || DEFAULT_IMAGE }} style={styles.avatar} />

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  scrollContent: {
    padding: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 25,
    zIndex: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
