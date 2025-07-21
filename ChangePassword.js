import React, { useState } from 'react';
import {View,Text,StyleSheet,SafeAreaView,ScrollView,TextInput,TouchableOpacity,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }

    Alert.alert('Success', 'Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    navigation.goBack();
  };

  const renderPasswordInput = (label, value, onChangeText, show, setShow) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon name="lock-outline" size={20} color="#888" style={styles.leftIcon} />
        <TextInput
          style={styles.input}
          secureTextEntry={!show}
          placeholder={`Enter ${label.toLowerCase()}`}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.rightIcon}>
          <Icon name={show ? 'eye-off-outline' : 'eye-outline'} size={22} color="#888" />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={26} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Change Password</Text>

        <View style={styles.form}>
          {renderPasswordInput('Current Password', currentPassword, setCurrentPassword, showCurrent, setShowCurrent)}
          {renderPasswordInput('New Password', newPassword, setNewPassword, showNew, setShowNew)}
          {renderPasswordInput('Confirm New Password', confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;

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
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    backgroundColor: '#d5f3ff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    marginTop: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    marginTop: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
