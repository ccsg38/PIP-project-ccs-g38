import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Check if email and password are provided individually
    if (email === '') {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    
    if (password === '') {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    // Here you can perform login logic (e.g., API call)
    // Simulate login success and store credentials
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password); // Storing password (consider security implications in real applications)

      Alert.alert('Login Successful', 'Welcome back!');
      navigation.replace('Home'); // Redirect to HomeScreen after login
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again.');
      console.error('Error saving data', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerPrompt}>
        New member? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Register here</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#00796B',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#009688', // Consistent button color
    padding: 12, // Padding for button
    borderRadius: 5,
    width: '80%', // Full width of input
    alignItems: 'center',
    marginVertical: 8, // Spacing between buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerPrompt: {
    marginTop: 15,
    color: '#00796B',
  },
  registerLink: {
    color: '#00796B',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
