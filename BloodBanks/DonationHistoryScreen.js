import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const donationData = [
  { id: '1', donor: 'Anil Mehra', date: '22 July 2025', amount: '500ml' },
  { id: '2', donor: 'Sunita Reddy', date: '18 July 2025', amount: '450ml' },
];

const DonationHistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donation History</Text>
      </View>

      {/* Donation List */}
      <FlatList
        data={donationData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.donor}</Text>
            <Text style={styles.details}>{item.date}</Text>
            <Text style={styles.amount}>Amount: {item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default DonationHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fbff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:25,
    gap: 10,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  amount: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 6,
  },
});
