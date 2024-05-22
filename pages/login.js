import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useUser } from './UserContext';

export function Login() {
  const { setUserId, setIsAnonymous } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const users = await AsyncStorage.multiGet(keys);

        console.log('Usuários cadastrados:');
        users.forEach(([key, value]) => {
          console.log(key + ': ' + value);
        });

        const savedEmail = await AsyncStorage.getItem('user_email');
        if (savedEmail) {
          setIsAnonymous(false);
          navigation.navigate('Main');
        }
      } catch (error) {
        console.error('Erro ao verificar usuários cadastrados:', error);
      }
    };
    checkUserLoggedIn();
  }, []);


  const handleEmailChange = (text) => {
    setEmail(text);
    setErrorMessage('');
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setErrorMessage('');
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleBirthdayChange = (text) => {
    setBirthday(text);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handleLogin = async () => {
    try {
      const savedUserData = await AsyncStorage.getItem(email);
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        if (userData.password === password) {
          setUserId(email);
          setIsAnonymous(false);
          await AsyncStorage.setItem('user_email', email);
          navigation.navigate('Main');
        } else {
          setErrorMessage('Email ou senha inválidos.');
        }
      } else {
        setErrorMessage('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      setErrorMessage('Erro ao obter dados do usuário.');
    }
  };

  const handleAuthAction = async () => {
    if (isLogin) {
      handleLogin();
    } else {
      try {
        const savedUserData = await AsyncStorage.getItem(email);
        if (savedUserData) {
          setErrorMessage('Usuário já cadastrado com esse email.');
        } else {
          const newUser = { email, password, username, birthday, phone };
          // Adicionando log dos dados do novo usuário
          console.log('Usuário cadastrado:', JSON.stringify(newUser));
          await AsyncStorage.setItem(email, JSON.stringify(newUser));
          await AsyncStorage.setItem('user_email', email);
          setUserId(email);
          setIsAnonymous(false);
          navigation.navigate('Main');
        }
      } catch (error) {
        console.error('Erro ao cadastrar novo usuário:', error);
        setErrorMessage('Erro ao cadastrar novo usuário.');
      }
    }
  };


  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
  };

  const handleBackPress = () => {
    navigation.navigate('Tutorial'); // Navega de volta para a página Index
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <ImageBackground
          source={isLogin ? require('../assets/login.png') : require('../assets/cadastro.png')}
          style={isLogin ? styles.backgroundImage : styles.backgroundImage2}
        >
          <Animatable.View
            animation="slideInUp"
            duration={700}
            style={styles.mensagemFinal}
          >
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>
                {isLogin ? 'Seja bem-vindo (a) ao' : 'Cadastre-se agora para \numa melhor experiência!'}
              </Text>
              <Image source={require('../assets/logo.png')} style={styles.image} />
              {!isLogin && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome de Usuário"
                    value={username}
                    onChangeText={handleUsernameChange}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Data de Nascimento (dd/mm/aaaa)"
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
                </>
              )}
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
                style={styles.authButton}
                onPress={handleAuthAction}
              >
                <Text style={styles.buttonText}>{isLogin ? 'Acessar' : 'Cadastrar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={toggleAuthMode}
              >
                <Text style={styles.toggleButtonText}>
                  {isLogin ? 'Não possui uma conta? Cadastre-se!' : 'Já possui uma conta? Acesse!'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.backButton} onPress={handleBackPress}
              >
                <Text style={styles.backText}>Pular</Text>
                <Image source={require('../assets/setaDireita.png')} style={styles.backIcon} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '53%',
    justifyContent: 'flex-end',
  },

  containerForm: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    // marginBottom: 160,
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage2: {
    flex: 1,
    width: '100%',
    height: '46%',
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingTop: 270
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 40,
    // marginBottom: -200,
    paddingEnd: 40,
    paddingStart: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 21,
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
  authButton: {
    backgroundColor: '#0B8C38',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    marginTop: 10,
    height: 50,
  },
  backButton: {
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'flex-start',
    height: 50,
    paddingBottom: 70
  },
  backButtonSeta: {
    alignSelf: 'flex-start',
    width: 43,
    height: 40,
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
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom:14
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  backText: {
    marginRight: 5,
    color: '#5F5F5F',
    fontWeight: 'bold',
    fontSize: 18,
  },
  toggleButtonText: {
    paddingTop:12,
    fontSize:16,
    color: '#F26E22',
    fontWeight: '600',
  },
});


