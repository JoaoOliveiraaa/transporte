import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const handleConnectESP32 = () => {
    navigation.navigate('ConnectESP32');
  };

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.optionText}>4 Disponível</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>4 Temporária</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>8 Indisponível</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>8 Especial</Text>
      </View>

      
      <TouchableOpacity style={styles.connectButton} onPress={handleConnectESP32}>
        <Text style={styles.connectButtonText}>Conectar com ESP32 + WiFi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  option: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#28a745',
    borderRadius: 8,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
