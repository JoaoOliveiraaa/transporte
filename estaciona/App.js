import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'; 
import RegistrationScreen from './RegistrationScreen';
import HomeScreen from './HomeScreen';
import ConnectESP32 from './ConnectESP32';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        <Stack.Screen 
          name="RegistrationScreen" 
          component={RegistrationScreen} 
          options={{ title: 'Registro' }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="ConnectESP32" 
          component={ConnectESP32}  // Verifique o nome do componente
          options={{ title: 'Conectar ESP32' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
