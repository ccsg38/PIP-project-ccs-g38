import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userProfile');
        if (storedData) {
          const userData = JSON.parse(storedData);
          setName(userData.name || '');
          setEmail(userData.email || '');
          setAddress(userData.address || '');
          setPhone(userData.phone || '');
          setDay(userData.dob ? new Date(userData.dob).getDate().toString() : '');
          setMonth(userData.dob ? (new Date(userData.dob).getMonth() + 1).toString() : '');
          setYear(userData.dob ? new Date(userData.dob).getFullYear().toString() : '');
          setGender(userData.gender || '');
          setEmergencyContact(userData.emergencyContact || '');
          setMedicalHistory(userData.medicalHistory || '');
          setProfilePicture(userData.profilePicture || null);
        }
      } catch (error) {
        console.error('Failed to load user profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const handleUpdate = async () => {
    // Validate user inputs
    if (!name || !email || !address || !phone || !gender || !emergencyContact) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    // Store user profile data in AsyncStorage
    const userProfile = {
      name,
      email,
      address,
      phone,
      dob: `${day}/${month}/${year}`,
      gender,
      emergencyContact,
      medicalHistory,
      profilePicture,
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      Alert.alert('Success', 'Profile updated successfully!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to save user profile data:', error);
    }
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
    setProfilePicture(null);
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

      {/* Name Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Address Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Phone Number Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      {/* Date of Birth Section */}
      <Text style={styles.label}>Date of Birth:</Text>
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

      {/* Gender Picker */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Gender:</Text>
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
      </View>

      {/* Emergency Contact Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Emergency Contact:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter emergency contact number"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
        />
      </View>

      {/* Medical History Section */}
      <View style={styles.inputRow}>
        <Text style={styles.label}>Medical History:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter medical history"
          value={medicalHistory}
          onChangeText={setMedicalHistory}
          multiline={true}
          numberOfLines={3}
        />
      </View>

      {/* Update Profile Button */}
      <Button title="Update Profile" onPress={handleUpdate} color="#00796B" />

      {isSubmitted && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationTitle}>Profile Information:</Text>
          <Text>Name: {name}</Text>
          <Text>Email: {email}</Text>
          <Text>Address: {address}</Text>
          <Text>Phone: {phone}</Text>
          <Text>Date of Birth: {`${day}/${month}/${year}`}</Text>
          <Text>Gender: {gender}</Text>
          <Text>Emergency Contact: {emergencyContact}</Text>
          <Text>Medical History: {medicalHistory}</Text>
          {profilePicture && <Image source={{ uri: profilePicture }} style={styles.confirmationImage} />}
        </View>
      )}
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
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '70%',
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  dateInput: {
    width: '30%',
    borderColor: '#00796B',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  picker: {
    width: '70%',
    height: 50,
  },
  confirmationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default ProfileForm;
