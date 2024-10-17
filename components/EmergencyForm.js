import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EmergencyForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [preferredHospital, setPreferredHospital] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState('');

  const handleSubmit = () => {
    console.log('Emergency Form submitted:', {
      name,
      age,
      gender,
      bloodType,
      allergies,
      currentMedications,
      medicalConditions,
      emergencyContactName,
      emergencyContactPhone,
      preferredHospital,
      insuranceDetails,
    });
    // Add your API request logic here
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} 
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Emergency Form</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age:</Text>
          <TextInput style={styles.input} value={age} keyboardType="numeric" onChangeText={setAge} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={gender}
            style={styles.picker}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Blood Type:</Text>
          <Picker
            selectedValue={bloodType}
            style={styles.picker}
            onValueChange={(itemValue) => setBloodType(itemValue)}
          >
            <Picker.Item label="Select Blood Type" value="" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Allergies:</Text>
          <TextInput style={styles.input} value={allergies} onChangeText={setAllergies} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Medications:</Text>
          <TextInput style={styles.input} value={currentMedications} onChangeText={setCurrentMedications} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Medical Conditions:</Text>
          <TextInput style={styles.input} value={medicalConditions} onChangeText={setMedicalConditions} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Emergency Contact Name:</Text>
          <TextInput style={styles.input} value={emergencyContactName} onChangeText={setEmergencyContactName} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Emergency Contact Phone:</Text>
          <TextInput style={styles.input} value={emergencyContactPhone} keyboardType="phone-pad" onChangeText={setEmergencyContactPhone} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Preferred Hospital:</Text>
          <TextInput style={styles.input} value={preferredHospital} onChangeText={setPreferredHospital} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insurance Details:</Text>
          <TextInput style={styles.input} value={insuranceDetails} onChangeText={setInsuranceDetails} />
        </View>

        <Button title="Submit" onPress={handleSubmit} color="#00796B" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00796B',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});

export default EmergencyForm;
