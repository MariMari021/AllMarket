import React from 'react';
import { StyleSheet, ImageBackground, View, TextInput, TouchableOpacity, Text } from 'react-native';

export function Cadastro() {

 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/cadastro.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerForm}>
          <Text style={styles.welcomeText}>Cadastre-se</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuário"
            // Aqui você pode adicionar mais propriedades conforme necessário
          />
          <View style={styles.inlineInputs}>
            <TextInput
              style={[styles.input, styles.inlineInput]}
              placeholder="Data de Aniversário"
              // Aqui você pode adicionar mais propriedades conforme necessário
            />
            <TextInput
              style={[styles.input, styles.inlineInput, styles.phone]}
              placeholder="Telefone"
              // Aqui você pode adicionar mais propriedades conforme necessário
            />
          </View>
          <TextInput
            style={[styles.input, styles.bottomInput]}
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
    paddingTop: '20%',
    paddingBottom: '5%',
    width: '100%',
    position: 'absolute',
    bottom: -250, // Movendo o container para baixo
    alignItems: 'center',

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
  inlineInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
  },
  inlineInput: {
    width: '48%', // Cada input ocupa 48% da largura
  },
  phone:{
    marginLeft: 10
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
  bottomInput: {
    marginBottom: 20, // Ajustando o espaçamento para que seja igual aos outros inputs
  },
});

export default Cadastro;
