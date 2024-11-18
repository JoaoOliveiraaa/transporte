import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const ConnectESP32 = () => {
  const [bleManager] = useState(new BleManager());
  const [device, setDevice] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    return () => bleManager.destroy(); // Limpeza ao desmontar o componente
  }, []);

  const handleConnect = async () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        Alert.alert('Erro', 'Erro ao escanear dispositivos.');
        return;
      }

      if (scannedDevice && scannedDevice.name === 'ESP32') {
        bleManager.stopDeviceScan();
        setDevice(scannedDevice);
        scannedDevice.connect().then((connectedDevice) => {
          Alert.alert('Conectado', 'Conectado ao ESP32 via Bluetooth.');
        }).catch(() => {
          Alert.alert('Erro', 'Erro ao conectar ao ESP32.');
        });
      }
    });
  };

  const sendDataToDevice = async () => {
    if (!device) {
      Alert.alert('Erro', 'Conecte ao ESP32 primeiro.');
      return;
    }

    try {
      const characteristic = await device.writeCharacteristicWithResponseForService(
        'service-uuid', // Substitua pelo UUID do serviço no ESP32
        'characteristic-uuid', // Substitua pelo UUID da característica no ESP32
        Buffer.from(message, 'utf-8').toString('base64') // Codifica mensagem
      );

      Alert.alert('Sucesso', `Comando "${message}" enviado ao ESP32.`);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao enviar mensagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao ESP32</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite um comando"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Conectar via Bluetooth" onPress={handleConnect} />
      <Button title="Enviar Comando" onPress={sendDataToDevice} />
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
