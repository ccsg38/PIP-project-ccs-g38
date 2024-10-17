import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const statesAndAreas = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Durg', 'Bilaspur'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Haryana': ['Chandigarh', 'Gurgaon', 'Faridabad', 'Hisar'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Mandi'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Manipur': ['Imphal', 'Thoubal', 'Churachandpur', 'Bishnupur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai', 'Nongpoh'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Kolasib'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Wokha'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur'],
  'Punjab': ['Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota'],
  'Sikkim': ['Gangtok', 'Namchi', 'Pelling', 'Mangan'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam'],
  'Tripura': ['Agartala', 'Ambassa', 'Dharmanagar', 'Belonia'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Nainital', 'Rishikesh'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'],
  'Jammu and Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'],
  'Ladakh': ['Leh', 'Kargil'],
};

const AmbulanceRequest = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [location, setLocation] = useState('');

  const handleRequestAmbulance = () => {
    if ((selectedState && selectedArea) || location) {
      Alert.alert('Ambulance Requested', `Requesting ambulance from: ${location || `${selectedArea}, ${selectedState}`}`);
      // Add your logic to handle the ambulance request here
    } else {
      Alert.alert('Error', 'Please select a state and area or enter your location.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request an Ambulance</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Your State:</Text>
        <Picker
          selectedValue={selectedState}
          onValueChange={(itemValue) => {
            setSelectedState(itemValue);
            setSelectedArea(''); // Reset area when state changes
          }}
          style={styles.picker}
        >
          <Picker.Item label="Select State" value="" />
          {Object.keys(statesAndAreas).map((state) => (
            <Picker.Item key={state} label={state} value={state} />
          ))}
        </Picker>
      </View>

      {selectedState ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Your Area:</Text>
          <Picker
            selectedValue={selectedArea}
            onValueChange={(itemValue) => setSelectedArea(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Area" value="" />
            {statesAndAreas[selectedState].map((area) => (
              <Picker.Item key={area} label={area} value={area} />
            ))}
          </Picker>
        </View>
      ) : null}

      <Text style={styles.orText}>OR</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your nearest location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Conditionally render the button only if both state and area are selected or if a location is entered */}
      {(selectedState && selectedArea) || location ? (
        <TouchableOpacity style={styles.button} onPress={handleRequestAmbulance}>
          <Text style={styles.buttonText}>Request Ambulance</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  orText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AmbulanceRequest;
