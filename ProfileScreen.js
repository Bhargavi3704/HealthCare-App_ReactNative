import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJk-ijRB_BPwJHcBC6FdinircAPdW6aHY3A&s';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
  });

  // Reload userProfile on screen focus
  useFocusEffect(
    React.useCallback(() => {
      const loadUserProfile = async () => {
        const storedProfile = await AsyncStorage.getItem('userProfile');
        if (storedProfile) {
          setUser(JSON.parse(storedProfile));
        }
      };
      loadUserProfile();
    }, [])
  );

  const handleImagePick = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openGallery() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 0.7 });
    if (!result.didCancel && result.assets?.[0]?.uri) {
      updatePhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
    if (!result.didCancel && result.assets?.[0]?.uri) {
      updatePhoto(result.assets[0].uri);
    }
  };

  const updatePhoto = async (uri) => {
    const updated = { ...user, photo: uri };
    setUser(updated);
    await AsyncStorage.setItem('userProfile', JSON.stringify(updated));
  };

  const handleOptionPress = (option) => {
    switch (option) {
      case 'Edit Profile':
        navigation.navigate('EditProfile');
        break;
      case 'Notifications':
        navigation.navigate('Notifications');
        break;
      case 'Settings':
        navigation.navigate('Settings');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={{ uri: user?.photo || DEFAULT_IMAGE }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <Text style={styles.name}>{user?.name || 'Your Name'}</Text>
        <Text style={styles.email}>{user?.email || 'your@email.com'}</Text>

        <View style={styles.optionsContainer}>
          {['Edit Profile', 'Notifications', 'Settings'].map((option, index, array) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionRow,
                index === array.length - 1 && styles.lastOptionRow
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <Icon name="chevron-right" size={22} color="#888" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 25,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  optionsContainer: {
    width: '100%',
    backgroundColor: '#d5f3ff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
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
