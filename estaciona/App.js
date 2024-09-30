import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    if (email) {
      try {
        const response = await fetch(apiUrl);
        const users = await response.json();

        console.log(users);

        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
          Alert.alert('Login bem-sucedido', `Nome: ${user.name}\nE-mail: ${user.email}`);
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer a requisição.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha o campo de e-mail.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
