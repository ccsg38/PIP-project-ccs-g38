import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importing Picker for dropdown selection

const BloodBank = () => {
  const [bloodType, setBloodType] = useState(''); // State to hold selected blood type
  const [requestCount, setRequestCount] = useState(0); // State to count requests
  const [notifications, setNotifications] = useState([]); // State to hold notifications

  const handleRequestBlood = () => {
    if (!bloodType) {
      Alert.alert('Input Error', 'Please select a blood type.');
      return;
    }

    const newNotification = {
      id: notifications.length + 1,
      type: bloodType,
      count: requestCount + 1,
    };

    setNotifications([...notifications, newNotification]);
    setRequestCount(requestCount + 1); // Increment request count
    setBloodType(''); // Clear the dropdown selection

    Alert.alert('Success', `Blood banks have been notified for blood type: ${bloodType}`);
  };

  const handleClearRequests = () => {
    setNotifications([]); // Clear notifications
    setRequestCount(0); // Reset request count
    Alert.alert('Cleared', 'All notifications have been cleared.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood Bank Notification</Text>

      <Picker
        selectedValue={bloodType}
        onValueChange={(itemValue) => setBloodType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Blood Type" value="" />
        <Picker.Item label="A+" value="A+" />
        <Picker.Item label="A-" value="A-" />
        <Picker.Item label="B+" value="B+" />
        <Picker.Item label="B-" value="B-" />
        <Picker.Item label="AB+" value="AB+" />
        <Picker.Item label="AB-" value="AB-" />
        <Picker.Item label="O+" value="O+" />
        <Picker.Item label="O-" value="O-" />
      </Picker>

      <Button title="Notify Blood Banks" onPress={handleRequestBlood} color="#00796B" />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text>Requested Blood Type: {item.type}</Text>
            <Text>Request Count: {item.count}</Text>
          </View>
        )}
        style={styles.list}
      />

      <Button title="Clear All Requests" onPress={handleClearRequests} color="#D32F2F" />
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  notification: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
  },
  list: {
    width: '100%',
    marginVertical: 20,
  },
});

export default BloodBank;


// Importing necessary libraries and components
// import React from 'react'; // Importing React to use JSX syntax
// import { View, Text, Button, StyleSheet } from 'react-native'; // Importing components from React Native for UI

// Defining the BloodBank functional component
// const BloodBank = () => {
  
  // Function to handle blood request notification
  // const handleRequestBlood = () => {
    // Placeholder logic to notify blood banks (API call can be added later)
    // console.log('Notifying blood banks...'); // Log action for now
    // Add your API request logic here in the future
  // };

  // Rendering the component
  // return (
    // <View style={styles.container}> {/* Main container for the component */}
      // <Text style={styles.title}>Blood Bank Notification</Text> {/* Title text for the screen */}
      // <Button title="Notify Blood Banks" onPress={handleRequestBlood} /> {/* Button to trigger the blood bank notification */}
    // </View>
  // };
// };

// Stylesheet for the BloodBank component
// const styles = StyleSheet.create({
//   container: {
    // flex: 1, // Allow the container to fill the available space
    // justifyContent: 'center', // Center content vertically within the container
    // alignItems: 'center', // Center content horizontally within the container
    // backgroundColor: '#F5F5F5', // Set background color of the container
  // },
//   title: {
    // fontSize: 24, // Set font size for the title
    // marginBottom: 20, // Add space below the title
  // },
// });

// Exporting the BloodBank component for use in other parts of the application
// export default BloodBank;
