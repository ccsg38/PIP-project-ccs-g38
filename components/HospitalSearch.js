import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns

const statesAndAreas = {
  'Andhra Pradesh': {
    Visakhapatnam: ['Visakha Institute of Medical Sciences', 'Apollo Hospitals', 'KIMS'],
    Vijayawada: ['Aster Prime Hospital', 'Sai Sanjeevani Hospital', 'Government General Hospital'],
    Guntur: ['Guntur Government Hospital', 'Narayana Hospitals', 'KIMS Guntur'],
    Nellore: ['Nellore Government Hospital', 'Apollo Hospitals', 'Gems Hospital'],
    Tirupati: ['Sri Venkateswara Institute of Medical Sciences', 'Tirupati Hospital', 'Sri Padmavathi Medical College'],
  },
  'Arunachal Pradesh': {
    Itanagar: ['Tomo Riba Institute of Health and Medical Sciences', 'Rashtriya Military School Hospital'],
    Naharlagun: ['TRIHMS Naharlagun', 'Naharlagun General Hospital'],
    Pasighat: ['Pasighat General Hospital'],
    Tezpur: ['Tezpur Medical College and Hospital'],
  },
  'Assam': {
    Guwahati: ['Guwahati Medical College and Hospital', 'NEMCARE Hospital', 'Apollo Hospitals'],
    Dibrugarh: ['AMCH Dibrugarh', 'Sunrise Hospital'],
    Silchar: ['Silchar Medical College and Hospital', 'Kailash Hospital'],
    Jorhat: ['Jorhat Medical College and Hospital', 'Madhab Choudhury Hospital'],
    Nagaon: ['Nagaon Medical College and Hospital', 'Himalaya Hospital'],
  },
  'Bihar': {
    Patna: ['Patna Medical College and Hospital', 'Apollo Hospitals', 'Fortis Hospital'],
    Gaya: ['Gaya Medical College and Hospital', 'Buddha Medical College'],
    Bhagalpur: ['Jawaharlal Nehru Medical College Hospital', 'Bihar Medical College'],
    Muzaffarpur: ['Muzaffarpur Medical College and Hospital', 'SSM College Hospital'],
  },
  'Chhattisgarh': {
    Raipur: ['AIIMS Raipur', 'Shree Narayana Hospital', 'Ramkrishna Care Hospital'],
    Bhilai: ['Bhilai Steel Plant Hospital', 'Narayana Health'],
    Durg: ['Durg District Hospital', 'Ameya Multispeciality Hospital'],
    Bilaspur: ['Bilaspur District Hospital', 'Shri Ram Hospital'],
  },
  'Goa': {
    Panaji: ['Goa Medical College', 'Manipal Hospital'],
    Margao: ['Fr. Agnel Hospital', 'Sanjeevani Hospital'],
    VascodaGama: ['Vasco Municipal Hospital', 'HM Hospital'],
    Ponda: ['Ponda District Hospital'],
  },
  'Gujarat': {
    Ahmedabad: ['Apollo Hospitals', 'Gujarat Cancer Research Institute', 'Shalby Hospital'],
    Surat: ['New Civil Hospital', 'Surat Municipal Institute of Medical Education and Research'],
    Vadodara: ['Sardar Patel Hospital', 'M.S. University Hospital'],
    Rajkot: ['Saurashtra Hospital', 'Shreeji Hospital'],
    Gandhinagar: ['Gandhinagar Civil Hospital'],
  },
  'Haryana': {
    Chandigarh: ['PGIMER', 'Max Super Speciality Hospital'],
    Gurgaon: ['Fortis Memorial Research Institute', 'Medanta'],
    Faridabad: ['Asian Hospital', 'CIMS'],
    Hisar: ['Hisar Civil Hospital', 'Satyam Hospital'],
  },
  'Himachal Pradesh': {
    Shimla: ['IGMC Shimla', 'Koti Chawla Hospital'],
    Manali: ['Manali Hospital', 'Sanjivani Hospital'],
    Dharamshala: ['Dharamshala Hospital', 'Zonal Hospital'],
    Mandi: ['Mandi District Hospital', 'Krishna Hospital'],
  },
  'Jharkhand': {
    Ranchi: ['RIMS Ranchi', 'Medica Superspecialty Hospital'],
    Jamshedpur: ['Tata Main Hospital', 'Steel City Hospital'],
    Dhanbad: ['Dhanbad Medical College and Hospital', 'Bokaro General Hospital'],
    Bokaro: ['Bokaro General Hospital', 'Paras Hospital'],
  },
  'Karnataka': {
    Bengaluru: ['Apollo Hospitals', 'Manipal Hospitals', 'Narayana Health'],
    Mysuru: ['Apollo Hospitals', 'Columbia Asia Hospital'],
    Mangaluru: ['AJ Hospital', 'KMC Hospital'],
    Hubli: ['Hubli Eye Hospital', 'Karnataka Institute of Medical Sciences'],
    Belagavi: ['Shri Dhanvantari Hospital', 'KLE Hospital'],
  },
  'Kerala': {
    Thiruvananthapuram: ['SCTIMST', 'Medical College Hospital'],
    Kochi: ['Amrita Institute of Medical Sciences', 'Lissie Hospital'],
    Kozhikode: ['Malabar Institute of Medical Sciences', 'Kozhikode Medical College'],
    Kollam: ['Kollam Medical College', 'Aster MIMS'],
  },
  'Madhya Pradesh': {
    Bhopal: ['Hamidia Hospital', 'Narmada Trauma Centre'],
    Indore: ['Bombay Hospital', 'Sankalp Hospital'],
    Gwalior: ['Gwalior Medical College', 'Jaypee Hospital'],
    Jabalpur: ['Jabalpur Hospital and Research Centre'],
  },
  'Maharashtra': {
    Mumbai: ['Lilavati Hospital', 'Kokilaben Dhirubhai Ambani Hospital', 'Fortis Hospital'],
    Pune: ['Ruby Hall Clinic', 'Sahyadri Hospital', 'Aditya Birla Memorial Hospital'],
    Nagpur: ['Orange City Hospital', 'Shri Ram Hospital'],
    Nashik: ['Suyash Hospital', 'Nashik City Hospital'],
    Aurangabad: ['Hinduja Hospital', 'Aurangabad Civil Hospital'],
  },
  'Manipur': {
    Imphal: ['Jawaharlal Nehru Institute of Medical Sciences', 'Regional Institute of Medical Sciences'],
    Thoubal: ['Thoubal District Hospital'],
    Churachandpur: ['Churachandpur District Hospital'],
    Bishnupur: ['Bishnupur District Hospital'],
  },
  'Meghalaya': {
    Shillong: ['North Eastern Indira Gandhi Regional Institute of Health and Medical Sciences', 'Civil Hospital'],
    Tura: ['Tura Civil Hospital'],
    Jowai: ['Jowai Civil Hospital'],
    Nongpoh: ['Nongpoh Civil Hospital'],
  },
  'Mizoram': {
    Aizawl: ['Zoram Medical College', 'Aizawl Civil Hospital'],
    Lunglei: ['Lunglei Civil Hospital'],
    Saiha: ['Saiha District Hospital'],
    Kolasib: ['Kolasib District Hospital'],
  },
  'Nagaland': {
    Kohima: ['Naga Hospital Authority Kohima', 'Regional Institute of Medical Sciences'],
    Dimapur: ['Dimapur District Hospital'],
    Mokokchung: ['Mokokchung District Hospital'],
    Wokha: ['Wokha District Hospital'],
  },
  'Odisha': {
    Bhubaneswar: ['AIIMS Bhubaneswar', 'KIMS Bhubaneswar'],
    Cuttack: ['SCB Medical College and Hospital', 'Cuttack Hospital'],
    Rourkela: ['Rourkela Government Hospital'],
    Berhampur: ['Berhampur Medical College and Hospital'],
  },
  'Punjab': {
    Chandigarh: ['PGIMER', 'Fortis Hospital'],
    Amritsar: ['Amandeep Hospital', 'Medicare Hospital'],
    Ludhiana: ['Dayanand Medical College and Hospital', 'CMC Hospital'],
    Jalandhar: ['Jalandhar Civil Hospital'],
  },
  'Rajasthan': {
    Jaipur: ['Rajasthan University of Health Sciences', 'Sawai Man Singh Medical College'],
    Udaipur: ['GBH American Hospital', 'RNT Medical College'],
    Jodhpur: ['Jodhpur AIIMS', 'Mahatma Gandhi Hospital'],
    Kota: ['Kota Medical College', 'Kota District Hospital'],
  },
  'Sikkim': {
    Gangtok: ['Sikkim Manipal Institute of Medical Sciences', 'Central Referral Hospital'],
    Namchi: ['Namchi District Hospital', 'Mahatma Gandhi Memorial Hospital'],
    Pelling: ['Pelling District Hospital'],
    Mangan: ['Mangan District Hospital'],
  },
  'Tamil Nadu': {
    Chennai: ['Apollo Hospitals', 'Fortis Malar Hospital'],
    Coimbatore: ['GKNM Hospital', 'KMCH'],
    Madurai: ['Madurai Medical College', 'Meenakshi Mission Hospital'],
    Tiruchirappalli: ['Kaveri Hospital', 'Trichy SR Hospital'],
    Salem: ['Salem Medical College', 'Vijay Hospital'],
  },
  'Telangana': {
    Hyderabad: ['Apollo Hospitals', 'Nizam’s Institute of Medical Sciences'],
    Warangal: ['Kakatiya Medical College', 'Warangal MGM Hospital'],
    Nizamabad: ['Nizamabad District Hospital'],
    Khammam: ['Khammam Government Hospital'],
  },
  'Tripura': {
    Agartala: ['Agartala Government Medical College', 'G B Pant Hospital'],
    Ambassa: ['Ambassa Hospital'],
    Dharmanagar: ['Dharmanagar District Hospital'],
    Belonia: ['Belonia Hospital'],
  },
  'Uttar Pradesh': {
    Lucknow: ['King George’s Medical University', 'SGPGIMS'],
    Kanpur: ['Hallet Hospital', 'GSVM Medical College'],
    Agra: ['SN Medical College', 'Agra Medical College'],
    Varanasi: ['Banaras Hindu University Hospital', 'Sir Sunderlal Hospital'],
    Ghaziabad: ['Yashoda Hospital', 'Fortis Hospital'],
  },
  'Uttarakhand': {
    Dehradun: ['Max Super Speciality Hospital', 'Government Doon Medical College'],
    Haridwar: ['Haridwar District Hospital'],
    Nainital: ['Nainital District Hospital'],
    Rishikesh: ['AIIMS Rishikesh'],
  },
  'West Bengal': {
    Kolkata: ['SSKM Hospital', 'Apollo Gleneagles Hospital'],
    Howrah: ['Howrah District Hospital'],
    Siliguri: ['Siliguri District Hospital'],
    Durgapur: ['Durgapur Steel Plant Hospital'],
  },
  'Andaman and Nicobar Islands': {
    PortBlair: ['Dr. B.R. Ambedkar Institute of Medical Sciences', 'Community Health Centre'],
  },
  'Chandigarh': {
    Chandigarh: ['PGIMER', 'Government Medical College and Hospital'],
  },
  'Dadra and Nagar Haveli and Daman and Diu': {
    Daman: ['Community Health Centre', 'Daman Municipal Hospital'],
    Diu: ['Diu District Hospital'],
  },
  'Delhi': {
    Delhi: ['AIIMS Delhi', 'Safdarjung Hospital', 'Lady Hardinge Medical College'],
  },
  'Lakshadweep': {
    Kavaratti: ['Lakshadweep District Hospital'],
  },
  'Puducherry': {
    Puducherry: ['Jawaharlal Institute of Postgraduate Medical Education and Research', 'Indira Gandhi Medical College'],
  },
};

const HospitalSearch = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const handleSearchHospitals = () => {
    if (selectedState && selectedArea) {
      setHospitals(statesAndAreas[selectedState][selectedArea]);
    }
  };

  const sendDetailsToHospital = (hospital) => {
    // Add your logic to send details to the hospital
    alert(`Details sent to ${hospital}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Hospitals</Text>
      <Text style={styles.label}>Select Your State:</Text>
      <Picker
        selectedValue={selectedState}
        onValueChange={(itemValue) => {
          setSelectedState(itemValue);
          setSelectedArea(''); // Reset area when state changes
          setHospitals([]); // Clear hospitals when state changes
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select State" value="" />
        {Object.keys(statesAndAreas).map((state) => (
          <Picker.Item key={state} label={state} value={state} />
        ))}
      </Picker>
      {selectedState ? (
        <>
          <Text style={styles.label}>Select Your Area:</Text>
          <Picker
            selectedValue={selectedArea}
            onValueChange={(itemValue) => {
              setSelectedArea(itemValue);
              setHospitals(statesAndAreas[selectedState][itemValue] || []); // Update hospitals based on selected area
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select Area" value="" />
            {Object.keys(statesAndAreas[selectedState]).map((area) => (
              <Picker.Item key={area} label={area} value={area} />
            ))}
          </Picker>
        </>
      ) : null}
      <Button title="Search Hospitals" onPress={handleSearchHospitals} />
      {hospitals.length > 0 && (
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.hospitalCard}>
              <Text style={styles.hospitalName}>{item}</Text>
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={() => sendDetailsToHospital(item)}
              >
                <Text style={styles.sendButtonText}>Send Details</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
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
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  resultsContainer: {
    marginTop: 20,
    width: '100%',
  },
  hospitalCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sendButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HospitalSearch;
