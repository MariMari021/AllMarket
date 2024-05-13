import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

export function Cadastro() {
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleBirthdayChange = (text) => {
    text = text.replace(/[^\d/]/g, '');
    setBirthday(text);
  };

  const handlePhoneChange = (text) => {
    text = text.replace(/[^\d]/g, '');
    setPhone(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  
    if (!text.includes('@')) {
      setErrorMessage('Por favor, insira um email válido.');
    } else {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    if (text.length !== 8 || !/[!@#$%]/.test(text)) {
      setErrorMessage('A senha deve ter 8 caracteres e conter pelo menos um símbolo (!@#$%).');
    } else {
      setErrorMessage('');
    }
  };

  const handleCadastro = () => {
    if (!username || !birthday || !phone || !email || !password || errorMessage) {
      setErrorMessage('Por favor, preencha todos os campos corretamente.');
      return;
    }

    navigation.navigate('Sucesso');
    setErrorMessage('');
  };

  return (
    // <ScrollView style={{ height: 50 }}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/cadastro.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerForm}>
          <Text style={styles.welcomeText}>Cadastre-se em nosso App!</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuário"
            value={username}
            onChangeText={handleUsernameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="(dd/mm/aaaa)"
            value={birthday}
            onChangeText={handleBirthdayChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={handlePasswordChange}
          />
          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    // </ScrollView>
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
    bottom: -300,
    alignItems: 'center',
    height: '120%'
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
  errorContainer: {
    width: 300,
    alignItems: 'center', // Centralizando horizontalmente
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center', // Centralizando horizontalmente
  },
});


