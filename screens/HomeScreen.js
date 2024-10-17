import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const API_KEY = 'AIzaSyDaL5Xtp323nVSgJTvF7gzvTfAaOd4yDPg'; // Your Gemini API key
const CHAT_API_URL = 'https://api.yourgeminiapi.com/chat'; // Replace with the actual API endpoint

const HomeScreen = ({ navigation }) => {
  const scaleValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle chat button press
  const handleChatPress = async () => {
    try {
      const response = await axios.post(CHAT_API_URL, {
        // Add necessary payload based on your API's requirements
        key: API_KEY,
        message: "I need medical help", // Example message
      });

      // Handle the response as needed
      console.log("Chat response:", response.data);
      Alert.alert("Chat", "Response received: " + response.data.response); // Display response in an alert
    } catch (error) {
      console.error("Chat API error:", error);
      Alert.alert("Error", "Unable to connect to chat service. Please try again later.");
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://example.com/background-image.jpg' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Scrollable Buttons */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* First Column of Buttons */}
          <View style={styles.columnContainer}>
            <AnimatedButton
              onPress={() => navigation.navigate('AmbulanceRequest')}
              icon="ambulance"
              text="Request Ambulance"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
            <AnimatedButton
              onPress={() => navigation.navigate('PrimaryAid')}
              icon="help-circle"
              text="Primary Aid"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
            <AnimatedButton
              onPress={() => navigation.navigate('HospitalSearch')}
              icon="hospital"
              text="Search Hospital"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
          </View>

          {/* Second Column of Buttons */}
          <View style={styles.columnContainer}>
            <AnimatedButton
              onPress={() => navigation.navigate('BloodBank')}
              icon="blood-bag"
              text="Blood Bank"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
            <AnimatedButton
              onPress={() => navigation.navigate('ElderlyMonitoring')}
              icon="watch"
              text="Elderly Monitoring"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
            <AnimatedButton
              onPress={() => navigation.navigate('EmergencyForm')}
              icon="form-textbox"
              text="Emergency Form"
              scaleValue={scaleValue}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            />
          </View>
        </ScrollView>

        {/* Chat Button (Bottom Right Corner) */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={handleChatPress}
        >
          <MaterialCommunityIcons name="chat" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Fixed Profile Button */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialCommunityIcons name="account" size={24} color="#FFFFFF" />
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>LifeSaver App © 2024</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const AnimatedButton = ({ onPress, icon, text, scaleValue, onPressIn, onPressOut }) => (
  <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#43C6AC', '#191654']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.gradient}
      >
        <MaterialCommunityIcons name={icon} size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
    width: '200%',
  },
  columnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  button: {
    borderRadius: 12,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 7,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Chat button styles (fixed on bottom right)
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Profile button styles (fixed on top right)
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileButtonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default HomeScreen;
