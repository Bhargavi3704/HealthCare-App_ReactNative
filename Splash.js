import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Image, Animated, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.navigate('Login'); 
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={['#d5f3ff', '#e5f8dc']}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: scaleValue }] },
        ]}
      >
        <Image
          source={require('../Images/logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      <Text style={styles.poweredBy}>POWERED BY</Text>
      <Text style={styles.company}>MABERU CREATIONS PVT LTD</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 380,
    height: 380,
    borderRadius: 250,
  },
  poweredBy: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  company: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Splash;
