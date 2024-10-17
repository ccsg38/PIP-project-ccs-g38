import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; // Import SplashScreen
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EmergencyForm from '../components/EmergencyForm';
import AmbulanceRequest from '../components/AmbulanceRequest';
import HospitalSearch from '../components/HospitalSearch';
import PrimaryAid from '../components/PrimaryAid';
import BloodBank from '../components/BloodBank';
import ElderlyMonitoring from '../components/ElderlyMonitoring';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: true }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: true }} />
      <Stack.Screen name="EmergencyForm" component={EmergencyForm} options={{ title: 'Emergency Form', headerShown: true }} />
      <Stack.Screen name="AmbulanceRequest" component={AmbulanceRequest} options={{ title: 'Request Ambulance', headerShown: true }} />
      <Stack.Screen name="HospitalSearch" component={HospitalSearch} options={{ title: 'Search Hospitals', headerShown: true }} />
      <Stack.Screen name="PrimaryAid" component={PrimaryAid} options={{ title: 'Primary Aid', headerShown: true }} />
      <Stack.Screen name="BloodBank" component={BloodBank} options={{ title: 'Blood Bank', headerShown: true }} />
      <Stack.Screen name="ElderlyMonitoring" component={ElderlyMonitoring} options={{ title: 'Elderly Monitoring', headerShown: true }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
