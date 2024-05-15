import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // Recuperando os dados salvos do AsyncStorage
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
        if (storedEmail === email && storedPassword === password) {
          // Login bem-sucedido, navegar para a página Home
          navigation.navigate('Home');
        } else {
          setErrorMessage('Email ou senha inválidos.');
        }
      } else {
        setErrorMessage('Nenhum usuário cadastrado.');
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do cadastro:', error);
    }
  };
  

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/login.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerForm}>
          <Text style={styles.welcomeText}>Bem vindo (a) de volta!</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuário"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToCadastro}>
            <Text style={styles.signUpText}>
              Não possui uma conta? <Text style={styles.signUpLink}>Cadastre-se!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  containerForm: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    paddingTop: '10%',
    paddingBottom: '5%',
    width: '100%',
    position: 'absolute',
    bottom: -270,
    alignItems: 'center',
    height: '110%',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5F5F5F'
  },
  input: {
    height: 40,
    borderColor: '#F7AB38',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15.5,
    width: 300,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#165515',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    width: 300
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  signUpText: {
    color: '#5F5F5F',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  signUpLink: {
    color: '#0B57D0',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});
