import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const handleCadastro = async () => {
    if (!username || !birthday || !phone || !email || !password || errorMessage) {
      setErrorMessage('Por favor, preencha todos os campos corretamente.');
      return;
    }
  
    try {
      // Salvando os dados do cadastro no AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify({ username, email, password }));
      navigation.navigate('Home');
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao salvar os dados do cadastro:', error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Inicio');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/cadastro.png')}
          style={styles.backgroundImage}
        >
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Cadastre-se agora!</Text>
            <Image source={require('../assets/logo.png')} style={styles.image} />
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
              style={styles.registerButton}
              onPress={handleCadastro}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Image source={require('../assets/seta_esquerda.png')} style={styles.backButtonText} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '35%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 40,
    marginBottom: -180,
    paddingEnd: 40,
    paddingStart: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5F5F5F'
  },
  image: {
    width: 156,
    height: 30,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#F26E22',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#0B8C38',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    marginTop: 10,
    height: 50
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'flex-start',
    height: 50
  },
  backButtonText: {
    width: 45,
    height:40,
    alignSelf: 'flex-start',
    top: 10
  },
  errorContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

