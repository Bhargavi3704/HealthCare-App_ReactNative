import React, { useEffect, useState,useCallback} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,FlatList,BackHandler,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const DEFAULT_IMAGE = 'https://cdn-icons-png.flaticon.com/512/3350/3350145.png';

const bloodBankFeatures = [
  {
    name: 'Nearby Blood Banks',
    icon: 'hospital-marker',
    screen: 'BloodBankScreen',
    color: '#f9e4e4',
  },
  {
    name: 'Donation History',
    icon: 'history',
    screen: 'DonationHistoryScreen',
    color: '#f4f4f4',
  },
];

const BloodBanksHome = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Exit App', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Yes', onPress: () => BackHandler.exitApp() },
        ]);
        return true; // block default back navigation
      };

      const backHandler=BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
       backHandler.remove();
      };
      }, [])
  );
  
  const [bank, setBank] = useState(null);

  useEffect(() => {
    const loadBankData = async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      if (stored) {
        setBank(JSON.parse(stored));
      }
    };
    loadBankData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('BloodBankProfile')}>
          <Image source={{ uri: bank?.photo || DEFAULT_IMAGE }} style={styles.headerAvatar} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerWelcome}>Welcome</Text>
          <Text style={styles.headerName}>{bank?.name || 'Blood Bank Admin'}</Text>
        </View>
      </View>

      {/* Feature Cards */}
      <FlatList
        data={bloodBankFeatures}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon name={item.icon} size={40} color="#e60000" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BloodBanksHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginBottom: 25,
    backgroundColor: '#d5f3ff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerWelcome: {
    fontSize: 16,
    color: '#666',
  },
  headerName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  card: {
    width: '47%',
    marginBottom: 25,
    marginHorizontal: '1.5%',
    borderRadius: 12,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});
