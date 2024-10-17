import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmergencyDetails = ({ details }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Details</Text>
      <Text style={styles.detail}>Name: {details.name}</Text>
      <Text style={styles.detail}>Age: {details.age}</Text>
      <Text style={styles.detail}>Medical History: {details.medicalHistory}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default EmergencyDetails;
