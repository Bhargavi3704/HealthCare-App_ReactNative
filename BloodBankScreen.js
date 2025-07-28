import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const bloodBanksData = [
  {
    id: '1',
    name: 'Apollo Blood Bank',
    address: 'Street 123, Hyderabad',
    distance: '3.2 km',
    phone: '+911234567890',
    groups: {
      'A+': 'Available',
      'B+': 'Low',
      'O+': 'Unavailable',
    },
  },
  {
    id: '2',
    name: 'Red Cross Society',
    address: 'Area 456, Secunderabad',
    distance: '5.5 km',
    phone: '+919876543210',
    groups: {
      'A+': 'Unavailable',
      'B+': 'Available',
      'O+': 'Low',
    },
  },
  {
    id: '3',
    name: 'Care Hospital Blood Center',
    address: 'Main Road, Gachibowli',
    distance: '7.1 km',
    phone: '+918888888888',
    groups: {
      'A+': 'Available',
      'B+': 'Available',
      'O+': 'Available',
    },
  },
];

const BloodBankScreen = ({ navigation }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderGroupStatus = (group, status) => {
    let color = '#000';
    if (status === 'Available') color = 'green';
    else if (status === 'Low') color = 'red';
    else if (status === 'Unavailable') color = 'black';

    return (
      <View key={group} style={styles.groupContainer}>
        <Text style={styles.groupText}>{group}</Text>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
      </View>
    );
  };

  const renderBloodBank = ({ item }) => {
    if (
      selectedGroup &&
      (!item.groups[selectedGroup] || item.groups[selectedGroup] === 'Unavailable')
    ) {
      return null;
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Icon name="hospital-building" size={20} color="#007AFF" />
          <Text style={styles.bankName}>{item.name}</Text>
        </View>
        <Text style={styles.address}>
          {item.address} • {item.distance}
        </Text>

        <View style={styles.groupStatusContainer}>
          {Object.entries(item.groups).map(([group, status]) =>
            renderGroupStatus(group, status)
          )}
        </View>

        <TouchableOpacity
          style={styles.callButton}
          onPress={() => handleCall(item.phone)}
        >
          <Icon name="phone" size={18} color="#fff" />
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" top={9}/>
        </TouchableOpacity>
        <Text style={styles.header}>Nearby Blood Banks</Text>
      </View>

      {/* Filter by Blood Group */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.filterButton,
              selectedGroup === group && styles.filterSelected,
            ]}
            onPress={() =>
              setSelectedGroup(selectedGroup === group ? null : group)
            }
          >
            <Text
              style={[
                styles.filterText,
                selectedGroup === group && { color: '#fff' },
              ]}
            >
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Blood Bank List */}
      <FlatList
        data={bloodBanksData}
        renderItem={renderBloodBank}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Legend / Guidelines */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend:</Text>
        <View style={styles.legendRow}>
          <View style={[styles.statusDot, { backgroundColor: 'green' }]} />
          <Text style={styles.legendText}>Available</Text>

          <View style={[styles.statusDot, { backgroundColor: 'red', marginLeft: 20 }]} />
          <Text style={styles.legendText}>Low</Text>

          <View style={[styles.statusDot, { backgroundColor: 'black', marginLeft: 20 }]} />
          <Text style={styles.legendText}>Unavailable</Text>
        </View>
      </View>
    </View>
  );
};

export default BloodBankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f6fc',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f3b4d',
    marginLeft: 10,
    marginTop:25,
    marginBottom:10,
  },
  filterScroll: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: '#cfefff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  filterSelected: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bankName: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1f3b4d',
  },
  address: {
    fontSize: 14,
    color: '#4b6b88',
    marginBottom: 10,
  },
  groupStatusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 8,
  },
  groupText: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  callText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
  },
  legendContainer: {
    marginTop: 14,
    backgroundColor: '#f2faff',
    padding: 10,
    borderRadius: 10,
  },
  legendTitle: {
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 6,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    marginLeft: 6,
    marginRight: 10,
    color: '#333',
  },
});
