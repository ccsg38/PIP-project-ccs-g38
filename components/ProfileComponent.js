import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileForm = ({ user = {}, onUpdate }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [address, setAddress] = useState(user.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || ''); // New phone number state
  const [bio, setBio] = useState(user.bio || ''); // New bio state
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);

  const handleUpdate = () => {
    if (!name || !email || !address || !phoneNumber) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    console.log('Profile updated:', { name, email, address, phoneNumber, bio, profilePicture });
    onUpdate({ name, email, address, phoneNumber, bio, profilePicture });
    Alert.alert('Success', 'Profile updated successfully!');
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

  const handleReset = () => {
    setName(user.name || '');
    setEmail(user.email || '');
    setAddress(user.address || '');
    setPhoneNumber(user.phoneNumber || '');
    setBio(user.bio || '');
    setProfilePicture(user.profilePicture || null);
  };

  return (
    <View style={styles.container}>
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
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad" // Specific keyboard for phone input
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={3} // Allow multiline for bio
      />
      
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Update Profile" onPress={handleUpdate} color="#00796B" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Reset" onPress={handleReset} color="#FFC107" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignSelf: 'center',
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonWrapper: {
    marginVertical: 10,
    width: '100%',
  },
});

export default ProfileForm;
