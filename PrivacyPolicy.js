import React from 'react';
import {View,Text,ScrollView,StyleSheet,SafeAreaView,StatusBar,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PrivacyPolicy = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#eaf6fd" barStyle="dark-content" />

      <View style={styles.header}>
        <Icon name="shield-check-outline" size={26} color="#007AFF" />
        <Text style={styles.headerTitle}>Privacy & Policy</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and protect your information.
        </Text>

        <Text style={styles.sectionTitle}>2. Data Collection</Text>
        <Text style={styles.text}>
          We may collect personal details like your name, phone number, email address, health-related data, and other relevant information to provide services.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Usage</Text>
        <Text style={styles.text}>
          Your data will be used strictly for healthcare service purposes including appointment management, reports, communication, and analytics.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.text}>
          We do not share your data with any third-party service providers without your explicit consent, unless required by law.
        </Text>

        <Text style={styles.sectionTitle}>5. Security</Text>
        <Text style={styles.text}>
          All personal data is stored securely and we take all reasonable precautions to protect your information from misuse, loss, or unauthorized access.
        </Text>

        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to access, modify, or delete your data. You can contact our support team for any privacy-related requests.
        </Text>

        <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this policy periodically. Please review this page occasionally for any changes.
        </Text>

        <Text style={[styles.text, { marginBottom: 80 }]}>Last updated: July 2025</Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6fd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  content: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});
