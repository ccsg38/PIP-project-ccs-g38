import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

const ElderlyMonitoring = () => {
  const [heartRate, setHeartRate] = useState(''); // State to hold heart rate
  const [bloodPressure, setBloodPressure] = useState(''); // State to hold blood pressure
  const [monitoringData, setMonitoringData] = useState([]); // State to hold monitoring data

  const handleMonitorHealth = () => {
    if (!heartRate || !bloodPressure) {
      Alert.alert('Input Error', 'Please enter both heart rate and blood pressure.');
      return;
    }

    // Simulate monitoring logic
    const newMonitoringEntry = {
      id: monitoringData.length + 1,
      heartRate,
      bloodPressure,
      timestamp: new Date().toLocaleString(),
    };

    setMonitoringData([...monitoringData, newMonitoringEntry]); // Update monitoring data
    setHeartRate(''); // Clear heart rate input
    setBloodPressure(''); // Clear blood pressure input

    Alert.alert('Monitoring Started', `Monitoring started at ${newMonitoringEntry.timestamp}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elderly Health Monitoring</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Heart Rate (bpm)"
        value={heartRate}
        onChangeText={setHeartRate}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Blood Pressure (mmHg)"
        value={bloodPressure}
        onChangeText={setBloodPressure}
        keyboardType="numeric"
      />

      <Button title="Start Monitoring" onPress={handleMonitorHealth} color="#00796B" />

      {monitoringData.length > 0 && (
        <View style={styles.monitoringList}>
          <Text style={styles.listTitle}>Monitoring Data:</Text>
          {monitoringData.map((data) => (
            <View key={data.id} style={styles.monitoringEntry}>
              <Text>Heart Rate: {data.heartRate} bpm</Text>
              <Text>Blood Pressure: {data.bloodPressure} mmHg</Text>
              <Text>Time: {data.timestamp}</Text>
            </View>
          ))}
        </View>
      )}
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
  monitoringList: {
    marginTop: 20,
    width: '100%',
  },
  listTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  monitoringEntry: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default ElderlyMonitoring;
