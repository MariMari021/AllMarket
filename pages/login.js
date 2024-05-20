import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
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
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
        if (storedEmail === email && storedPassword === password) {
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
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.containerForm}>
          <Text style={styles.welcomeText}>Seja bem-vindo (a) ao</Text>
          <View style={styles.textWithImage}>
            
            <Image source={require('../assets/logo.png')} style={styles.icon} />
          </View>
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
            <Text style={styles.buttonText}>Acessar</Text>
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
    backgroundColor: '#FFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
  },
 
  containerForm: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 160,
    paddingEnd: 40,
    paddingStart: 40
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5f5f5f',
    marginBottom: 10,
  },
  textWithImage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subText: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold'
  },
  icon: {
    width: 156,
    height: 30,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#F26E22',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    top: 15
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#0B8C38',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    top: 15
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
    top: 15
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

export default Login;
