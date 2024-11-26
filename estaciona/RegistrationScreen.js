import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font'; // Hook para carregar as fontes
import { Roboto_400Regular } from '@expo-google-fonts/roboto'; // Importando a fonte Roboto

const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [fontsLoaded] = useFonts({
    Roboto_400Regular, // Font Roboto regular
  });

  const handleRegister = async () => {
    console.log('Tentando registrar:', email);

    // Verifica se os campos estão preenchidos
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Erro ao registrar:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="user-plus" size={80} color="#28a745" style={styles.icon} />
        <Text style={styles.title}>Criar conta</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Já tem uma conta? 
            <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}> Entrar</Text>
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
     fontFamily: 'Roboto_400Regular',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
     fontFamily: 'Roboto_400Regular',
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
     fontFamily: 'Roboto_400Regular',
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
     fontFamily: 'Roboto_400Regular',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
     fontFamily: 'Roboto_400Regular',
  },
  link: {
    color: '#28a745',
    textDecorationLine: 'underline',
     fontFamily: 'Roboto_400Regular',
  },
});

export default RegistrationScreen;
