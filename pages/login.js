import React from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text } from 'react-native';

export function Login({ navigation }) {

  const navigateToCadastro = () => {
    // Navegar para a página de cadastro
    navigation.navigate('Cadastro'); // Certifique-se de ter definido corretamente a rota para a página de cadastro
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
            // Aqui você pode adicionar mais propriedades conforme necessário
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            // Aqui você pode adicionar mais propriedades conforme necessário
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            // Aqui você pode adicionar mais propriedades conforme necessário
          />
          <TouchableOpacity
            style={styles.loginButton} // Aplicando o estilo do botão de login
            onPress={() => {
              // Adicione sua lógica de autenticação aqui
            }}
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
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 15.5,
    width: 300,
   
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
    marginTop: 20,
    color: '#5F5F5F',
    fontSize: 14,
    textAlign: 'center'
  },
  signUpLink: {
    color: '#007BFF', // Cor azul
    fontWeight: 'bold',
  },
});

export default Login;
