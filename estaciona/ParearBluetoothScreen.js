import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

const ParearBluetoothScreen = ({ navigation }) => {
  const [isPaired, setIsPaired] = useState(false);

  const handlePairBluetooth = () => {
    // Simulação de pareamento Bluetooth
    Alert.alert('Bluetooth', 'Pareando com o dispositivo...');
    setTimeout(() => {
      setIsPaired(true);
      Alert.alert('Sucesso', 'Pareado com sucesso!');
      navigation.navigate('HomeScreen'); // Após o pareamento, navega para a HomeScreen
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parear Dispositivo</Text>
      <Text style={styles.subtitle}>
        Clique no botão abaixo para parear o app com o ESP32 via Bluetooth.
      </Text>

      <TouchableOpacity
        style={[styles.button, isPaired && styles.buttonDisabled]}
        onPress={handlePairBluetooth}
        disabled={isPaired}
      >
        <Text style={styles.buttonText}>
          {isPaired ? 'Pareado!' : 'Parear Bluetooth'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ParearBluetoothScreen;
