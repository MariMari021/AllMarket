import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/index';
import { Login } from './pages/login';
import { Cadastro } from './pages/cadastro';
import { Compras } from './pages/compras';
import { Perfil } from './pages/perfil';
import { Produtos } from './pages/produtos';
import { CardAdicionado } from './pages/cardAdicionado';
import { Sucesso } from './pages/sucesso';
import { Inicio } from './pages/inicio';
import { ListaSalva } from './pages/listaSalva';
import { Tutorial } from './pages/tutorial';

const Stack = createStackNavigator();

const Navigation = () => {
    return (

        <Stack.Navigator initialRouteName="Inicio">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Compras" component={Compras} options={{ headerShown: false }} />
            <Stack.Screen name="Produtos" component={Produtos} options={{ headerShown: false }} />
            <Stack.Screen name="CardAdicionado" component={CardAdicionado} options={{ headerShown: false }} />
            <Stack.Screen name="Sucesso" component={Sucesso} options={{ headerShown: false}} />
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false}} />
            <Stack.Screen name="ListaSalva" component={ListaSalva} options={{ headerShown: false}} />
            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
            <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Navigation;