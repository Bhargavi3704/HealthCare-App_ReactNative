import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,SafeAreaView,StatusBar,Alert,Modal,ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DEFAULT_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJk-ijRB_BPwJHcBC6FdinircAPdW6aHY3A&s';

const Login = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [signUpModalVisible, setSignUpModalVisible] = useState(false);

  const [showPassword, setShowPassword] = useState(false); //For login

  // Sign-up form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showSignUpPassword, setShowSignUpPassword] = useState(false); //For signup
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); //For confirm

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('REMEMBERED_EMAIL');
        const savedPassword = await AsyncStorage.getItem('REMEMBERED_PASSWORD');

        if (savedEmail && savedPassword) {
          setEmailOrPhone(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to load saved credentials', error);
      }
    };

    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    if (emailOrPhone === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('userData');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        const isMatch =
          (parsedUser.email === emailOrPhone || parsedUser.phone === emailOrPhone) &&
          parsedUser.password === password;

        if (isMatch) {
          if (rememberMe) {
            await AsyncStorage.setItem('REMEMBERED_EMAIL', emailOrPhone);
            await AsyncStorage.setItem('REMEMBERED_PASSWORD', password);
          } else {
            await AsyncStorage.removeItem('REMEMBERED_EMAIL');
            await AsyncStorage.removeItem('REMEMBERED_PASSWORD');
          }

          navigation.navigate('Main');
        } else {
          Alert.alert('Login Failed', 'Invalid email/phone or password');
        }
      } else {
        Alert.alert('Login Failed', 'No registered user found. Please sign up first.');
      }
    } catch (error) {
      console.error('Login error', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSignup = async () => {
    if (!fullName || !email || !phone || !signUpPassword || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    if (signUpPassword !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    const userObject = {
      name: fullName,
      email: email.toLowerCase(),
      phone: phone,
      password: signUpPassword,
      photo: DEFAULT_IMAGE,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userObject));
      await AsyncStorage.setItem('userProfile', JSON.stringify(userObject));

      Alert.alert('Success', 'Account created successfully!');
      setSignUpModalVisible(false);

      // Clear form
      setFullName('');
      setEmail('');
      setPhone('');
      setSignUpPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#eaf6fd" />
      <Text style={styles.welcome}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email / Phone"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      {/* Password input with eye icon */}
      <View style={styles.passwordWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye' : 'eye-off'} size={22} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          tintColors={{ true: '#007AFF', false: '#999' }}
        />
        <Text style={styles.rememberText}>Remember Me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSignUpModalVisible(true)}>
        <Text style={styles.forgotPassword}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Sign Up Modal */}
      <Modal visible={signUpModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={signUpPassword}
              onChangeText={setSignUpPassword}
              secureTextEntry={!showSignUpPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowSignUpPassword(!showSignUpPassword)}>
              <Icon name={showSignUpPassword ? 'eye' : 'eye-off'} size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSignUpModalVisible(false)}>
            <Text style={styles.forgotPassword}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf6fd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 55,
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  passwordWrapper: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    width: '100%',
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    marginTop: 16,
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
});
