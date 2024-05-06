import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from './pages/index'; 
import {Login}from './pages/login'; 
import {Cadastro} from './pages/cadastro'; 
import {Compras} from './pages/compras'; 
import {Perfil} from './pages/perfil'; 
import {Produtos} from './pages/produtos'; 


const Stack = createStackNavigator();

const Navigation = () => {
  return (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Compras" component={Compras} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
          <Stack.Screen name="Produtos" component={Produtos} options={{ headerShown: false }} />
        </Stack.Navigator>
  );
};

export default Navigation;