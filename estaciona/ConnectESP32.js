import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

const ConnectESP32 = () => {
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');

  const handleConnect = async () => {
  if (wifiSSID && wifiPassword) {
    Alert.alert('Conectando', `Conectando ao ESP32 com SSID: ${wifiSSID}`);
    
    try {
      const response = await fetch('http://192.168.4.1/wifi-setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ssid: wifiSSID,
          password: wifiPassword,
        }),
      });

      const result = await response.json();
      if (result.status === 'connected') {
        Alert.alert('Sucesso', 'Conectado ao Wi-Fi com sucesso!');
      } else {
        Alert.alert('Erro', 'Falha ao conectar ao Wi-Fi.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar ao ESP32.');
    }
  } else {
    Alert.alert('Erro', 'Por favor, insira o SSID e a senha do WiFi.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao ESP32</Text>

      <TextInput
        style={styles.input}
        placeholder="SSID do WiFi"
        value={wifiSSID}
        onChangeText={setWifiSSID}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha do WiFi"
        value={wifiPassword}
        onChangeText={setWifiPassword}
        secureTextEntry
      />

      <Button title="Conectar" onPress={handleConnect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});

export default ConnectESP32;
