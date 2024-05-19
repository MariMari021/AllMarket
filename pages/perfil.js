import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Perfil() {

  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do cadastro:', error);
      }
    };

    getUserData();
  }, []);

  const [produtosAdicionados, setProdutosAdicionados] = useState([]);

  const numProdutosAdicionados = produtosAdicionados.length;

  const firstName = userData.username.split(' ')[0];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ScrollView style={{ height: 50 }}>
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/profile.png')} style={styles.iconeTopo} />
          <Image source={require('../assets/sacola.png')} style={styles.iconeTopo} />
        </View>
        <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {userData.username ? userData.username.split(' ')[0] : 'usuário'} <Image source={require('../assets/ola.png')} style={styles.ola} /> </Text>


          <Text style={styles.subtitle}>Consulte os seus dados.</Text>
        </View>
       
      </View>
     
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}><Text style={styles.yellowText}>Produtos</Text> adicionados</Text>
          <View style={styles.cardContent}>
            <Image source={require('../assets/sacolaBranca.png')} style={styles.cardIcon} />
            <Text style={styles.cardNumber}>{numProdutosAdicionados}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver Mais</Text>
            <Image source={require('../assets/setaLaranja.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.card2}>
          <Text style={styles.cardTitle2}><Text style={styles.greenText}>Categorias</Text> adicionados</Text>
          <View style={styles.cardContent}>
            <Image source={require('../assets/categoriaIcon.png')} style={styles.cardIcon} />
            <Text style={styles.cardNumber2}>7</Text>
          </View>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Ver Mais</Text>
            <Image source={require('../assets/setaVerde.png')} style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Dados {'\n'}Cadastrados</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/profile.png')} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Nome" value={userData.username} />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/emailIcon.png')} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Email" value={userData.email} />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/senhaIcon.png')} style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={userData.password} />
      </View>
      <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Sair do login</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  iconeTopo: {
    marginTop: 10,
    width: 35,
    height: 35,
  },
  topBar: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 20,
    marginBottom: 20,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  ola: {
    width: 30,
    height: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#5F5F5F'
  },
  userName: {
    color: '#007B3A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  card: {
    width: '48%',
    padding: 16,
    backgroundColor: '#0B8C38',
    borderRadius: 20,
  },
  card2: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 19,
    color: '#EAEAEA',
    fontWeight: 'bold',
  },
  cardTitle2: {
    fontSize: 19,
    color: '#5F5F5F',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowText: {
    color: '#F7AB38',
    fontWeight: 'bold',
    fontSize: 22,
  },
  greenText: {
    color: '#0B8C38',
    fontWeight: 'bold',
    fontSize: 22,
  },
  cardNumber: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardNumber2: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#F26E22',
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#88B887',
    borderRadius: 20,
    width: 130,
    height: 36,
  },
  button2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F4884A',
    borderRadius: 20,
    width: 130,
    height: 36,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 26,
    height: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#5F5F5F'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 17,
    marginBottom: 10,
    marginHorizontal: 16,
    paddingHorizontal: 8,
    marginTop: 20
  },
  input: {
    height: 40,
    flex: 1,
    paddingLeft: 8,
  },
  inputIcon: {
    width: 33,
    height: 33,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: 20,
    color: '#F4884A', // Cor laranja
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8, // Ajuste a altura conforme necessário
    paddingHorizontal: 12, // Ajuste a largura conforme necessário
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  
  
  
});


