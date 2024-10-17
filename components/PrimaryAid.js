import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrimaryAid = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Primary Aid Steps</Text>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>1. Call for Help</Text>
        <Text style={styles.stepDescription}>
          If someone is injured or unresponsive, call your local emergency number immediately. 
          Provide clear information about the situation, including the location and nature of the emergency.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>2. Check the Person's Responsiveness</Text>
        <Text style={styles.stepDescription}>
          Gently shake the person and shout to see if they respond. If they are unresponsive and not breathing, 
          start CPR immediately.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>3. Perform CPR if Necessary</Text>
        <Text style={styles.stepDescription}>
          If the person is not breathing or is only gasping, perform chest compressions. 
          Push hard and fast in the center of the chest at a rate of 100 to 120 compressions per minute.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>4. Treat Severe Bleeding</Text>
        <Text style={styles.stepDescription}>
          If the person is bleeding heavily, apply firm pressure to the wound using a clean cloth or bandage. 
          If possible, raise the injured area above the level of the heart. Keep applying pressure until help arrives.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>5. Help Someone Who is Choking</Text>
        <Text style={styles.stepDescription}>
          If someone is choking and cannot breathe or speak, stand behind them, wrap your arms around their waist, 
          and perform the Heimlich maneuver with quick upward thrusts. Repeat until the object is expelled.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>6. Treat a Burn</Text>
        <Text style={styles.stepDescription}>
          For minor burns, run cool (not cold) water over the burn for 10-15 minutes. 
          Cover with a clean, non-stick bandage. Do not apply ice. 
          For severe burns, do not submerge in water—seek emergency help immediately.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>7. Handle a Seizure</Text>
        <Text style={styles.stepDescription}>
          If someone is having a seizure, keep the area clear of objects to avoid injury. 
          Do not restrain them or put anything in their mouth. Once the seizure stops, turn them onto their side.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>8. Manage a Fracture</Text>
        <Text style={styles.stepDescription}>
          If a bone is suspected to be fractured, immobilize the injured area with a splint or padding. 
          Do not try to move the person. Apply an ice pack wrapped in cloth to reduce swelling and get medical help.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>9. Treat for Shock</Text>
        <Text style={styles.stepDescription}>
          If the person shows signs of shock (cold, clammy skin, rapid breathing), lay them down with their legs elevated. 
          Keep them warm and calm while waiting for emergency services.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>10. Treat Heat Exhaustion</Text>
        <Text style={styles.stepDescription}>
          Move the person to a cool place, remove excess clothing, and offer small sips of water. 
          Use cool, wet cloths to reduce body temperature. If symptoms worsen, seek emergency help.
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>11. Wait for the Ambulance to Arrive</Text>
        <Text style={styles.stepDescription}>
          Stay with the injured person, monitor their condition, and offer reassurance until emergency services arrive.
        </Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796B',
  },
  stepContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
  },
  stepDescription: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});

export default PrimaryAid;
