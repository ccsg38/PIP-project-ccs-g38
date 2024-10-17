import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Ensure you have this library
import { Picker } from '@react-native-picker/picker'; // Picker for gender and date selection

const ProfileForm = ({ user = {}, onUpdate }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [address, setAddress] = useState(user.address || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [day, setDay] = useState(user.dob ? new Date(user.dob).getDate().toString() : ''); // Changed to string
  const [month, setMonth] = useState(user.dob ? (new Date(user.dob).getMonth() + 1).toString() : ''); // Changed to string
  const [year, setYear] = useState(user.dob ? new Date(user.dob).getFullYear().toString() : ''); // Changed to string
  const [gender, setGender] = useState(user.gender || '');
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact || '');
  const [medicalHistory, setMedicalHistory] = useState(user.medicalHistory || '');
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);
  const [formattedDob, setFormattedDob] = useState(user.dob || ''); // Store the formatted DOB

  const handleUpdate = () => {
    // Validate user inputs
    if (!name || !email || !address || !phone || !gender || !emergencyContact) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    // Logic to update user profile (API call)
    console.log('Profile updated:', { name, email, address, phone, dob: formattedDob, gender, emergencyContact, medicalHistory, profilePicture });
    onUpdate({ name, email, address, phone, dob: formattedDob, gender, emergencyContact, medicalHistory, profilePicture });
    Alert.alert('Success', 'Profile updated successfully!'); // Show success message
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleDeletePicture = () => {
    setProfilePicture(null); // Reset profile picture
  };

  const handleReset = () => {
    setName(user.name || '');
    setEmail(user.email || '');
    setAddress(user.address || '');
    setPhone(user.phone || '');
    setDay(user.dob ? new Date(user.dob).getDate().toString() : '');
    setMonth(user.dob ? (new Date(user.dob).getMonth() + 1).toString() : '');
    setYear(user.dob ? new Date(user.dob).getFullYear().toString() : '');
    setGender(user.gender || '');
    setEmergencyContact(user.emergencyContact || '');
    setMedicalHistory(user.medicalHistory || '');
    setProfilePicture(user.profilePicture || null);
    setFormattedDob(''); // Reset formatted DOB
  };

  // Handle the confirmation of date of birth
  const handleConfirmDob = () => {
    const dob = `${day}/${month}/${year}`;
    setFormattedDob(dob); // Store the formatted DOB
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity>

      {profilePicture && (
        <Button title="Delete Picture" onPress={handleDeletePicture} color="#D32F2F" />
      )}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
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
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      
      {/* Date of Birth Section */}
      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.datePickerContainer}>
        <TextInput
          style={styles.dateInput}
          placeholder="DD"
          value={day}
          onChangeText={setDay}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="MM"
          value={month}
          onChangeText={setMonth}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <Button title="OK" onPress={handleConfirmDob} color="#00796B" />

      {formattedDob && ( // Display formatted date of birth after confirmation
        <Text style={styles.confirmedDob}>
          Confirmed Date of Birth: {formattedDob}
        </Text>
      )}

      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={emergencyContact}
        onChangeText={setEmergencyContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Medical History (e.g. allergies, chronic conditions)"
        value={medicalHistory}
        onChangeText={setMedicalHistory}
        multiline={true}
        numberOfLines={3}
      />
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Update Profile" onPress={handleUpdate} color="#00796B" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Reset" onPress={handleReset} color="#FFC107" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#00796B',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imagePlaceholder: {
    color: '#00796B',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  confirmedDob: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ProfileForm;
