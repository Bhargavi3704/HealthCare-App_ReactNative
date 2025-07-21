import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,FlatList,Alert,Linking} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportsScreen = ({ navigation }) => {
  const [myReports, setMyReports] = useState([]);
  const [doctorReports, setDoctorReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const stored = await AsyncStorage.getItem('reports');
        if (stored) {
          setMyReports(JSON.parse(stored));
        }

        const sampleDoctorReports = [
          {
            id: 'd1',
            title: 'Blood Test',
            date: '15 Jul',
            uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          },
          {
            id: 'd2',
            title: 'MRI Scan',
            date: '16 Jul',
            uri: 'https://www.africau.edu/images/default/sample.pdf',
          },
        ];
        setDoctorReports(sampleDoctorReports);
      } catch (err) {
        console.log('Error loading reports', err);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadReports);
    return unsubscribe;
  }, [navigation]);

  const getToday = () => {
    const date = new Date();
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
  };

  const handlePickReport = () => {
    Alert.alert('Upload Report', 'Choose method', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo' }, handleFileResponse);
        },
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'mixed' }, handleFileResponse);
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleFileResponse = async (response) => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Failed to upload');
      return;
    }

    const file = response.assets?.[0];
    if (!file) return;

    const newReport = {
      id: Date.now().toString(),
      title: file.fileName || 'Health Report',
      date: getToday(),
      uri: file.uri,
    };

    const updatedReports = [...myReports, newReport];
    setMyReports(updatedReports);
    await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const handleClearReports = async () => {
    Alert.alert('Confirm', 'Are you sure you want to delete all uploaded reports?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, Delete',
        onPress: async () => {
          await AsyncStorage.removeItem('reports');
          setMyReports([]);
          Alert.alert('Deleted', 'All uploaded reports cleared.');
        },
      },
    ]);
  };

  const renderReportItem = ({ item }, isDoctorReport = false) => (
    <View style={styles.reportCard}>
      <View style={styles.iconBox}>
        <Icon name="file-document-outline" size={26} color="#007AFF" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDate}>{item.date}</Text>
      </View>
      {isDoctorReport && item.uri && (
        <TouchableOpacity onPress={() => Linking.openURL(item.uri)}>
          <Icon name="download" size={22} color="#007AFF" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reports</Text>
      </View>

      <Text style={styles.sectionLabel}>Today Stats</Text>
      <FlatList
        data={doctorReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderReportItem({ item }, true)}
        scrollEnabled={false}
      />

      <Text style={styles.sectionLabel}>My Uploads</Text>
      <FlatList
        data={myReports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderReportItem({ item })}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={handlePickReport}>
        <Icon name="upload" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.uploadText}>Upload Report</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.uploadButton, { backgroundColor: '#ff3b30' }]}
        onPress={handleClearReports}
      >
        <Icon name="delete" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.uploadText}>Clear My Uploads</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  reportCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    backgroundColor: '#eaf4ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  reportDate: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:25,
    width:"85%",
    alignSelf:'center',
    bottom:20,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
