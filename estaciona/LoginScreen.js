import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font'; // Hook para carregar as fontes
import { Roboto_400Regular } from '@expo-google-fonts/roboto'; // Importando a fonte Roboto

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Carregando as fontes usando o hook useFonts
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, // Font Roboto regular
  });

  const handleLogin = async () => {
    console.log('Tentando fazer login:', email);
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('HomeScreen'); // Redireciona para a tela principal
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  if (!fontsLoaded) {
    return null; // Ou exibir uma tela de carregamento enquanto a fonte é carregada
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="sign-in" size={80} color="#007bff" style={styles.icon} />
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Insira seu e-mail e senha:</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Não tem uma conta? 
            <Text style={styles.link} onPress={() => navigation.navigate('RegistrationScreen')}> Cadastrar</Text>
          </Text>
        </View>
      </View>
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
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular', // Aplica a fonte Roboto carregada
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular', // Aplica a fonte Roboto carregada
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
    fontFamily: 'Roboto_400Regular', // Aplica a fonte Roboto carregada
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto_400Regular', // Aplica a fonte Roboto carregada
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    fontFamily: 'Roboto_400Regular', // Aplica a fonte Roboto carregada
  },
  link: {
    color: '#28a745',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
