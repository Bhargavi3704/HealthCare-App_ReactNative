import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert} from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSubmit = () => {
    if (emailOrPhone === '') {
      Alert.alert('Error', 'Please enter your email or phone');
      return;
    }
    Alert.alert(
      'Success',
      'Password reset instructions have been sent to your email or phone.'
    );
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eaf6fd" />
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your registered email or phone number. We’ll send you instructions to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email / Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backToLogin}>← Back to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6fd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 6,
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    width: '100%',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
});
