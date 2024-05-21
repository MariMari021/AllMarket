import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './pages/index';
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Compras } from './pages/compras';
import { Perfil } from './pages/perfil';
import { Produtos } from './pages/produtos';
import { CardAdicionado } from './pages/cardAdicionado';
import { Inicio } from './pages/inicio';
import { ListaSalva } from './pages/listaSalva';
import { Tutorial } from './pages/tutorial';
import { Sobre } from './pages/sobre'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBarIcon({ focused, source, label, iconWidth, iconHeight }) {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedContainer]}>
      <Image
        source={source}
        style={{ width: iconWidth, height: iconHeight, tintColor: focused ? '#fff' : "#0B8C38" }}
      />
      {focused && (
        <Text style={styles.focusedLabel}>
          {label}
        </Text>
      )}
    </View>
  );
}



function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#f0f0f0',
          height: 65,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 35, // Adiciona padding nas laterais
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              source={require('./assets/homeIcon.png')}
              label="Home"
              iconWidth={26}
              iconHeight={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ListaSalva"
        component={ListaSalva}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              source={require('./assets/listIcon.png')}
              label="Listas"
              iconWidth={26}
              iconHeight={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sobre"
        component={Sobre}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              source={require('./assets/orange.png')}
              label="Oba"
              iconWidth={26}
              iconHeight={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              source={require('./assets/profileIcon.png')}
              label="Perfil"
              iconWidth={28}
              iconHeight={27}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Produtos" component={Produtos} options={{ headerShown: false }} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
      <Stack.Screen name="CardAdicionado" component={CardAdicionado} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
      <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }} />
      <Stack.Screen name="Compras" component={Compras} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  focusedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 93, 0, 0.75)',
    borderRadius: 20,
    width: 110,
    height: 40
  },
  focusedLabel: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default function Routes() {
  return <AppNavigator />;
}