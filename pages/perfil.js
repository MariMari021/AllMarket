import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Perfil() {

  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  useEffect(() => {
    const getUserData = async () => {
      try {
        // Recuperando os dados salvos do AsyncStorage
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


  const [produtosAdicionados, setProdutosAdicionados] = useState([]); // Estado para armazenar os produtos adicionados

  const numProdutosAdicionados = produtosAdicionados.length; // Calcula o número de produtos adicionados


  const firstName = userData.username.split(' ')[0];


  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/profile.png')} style={styles.iconeTopo} />
          <Image source={require('../assets/sacola.png')} style={styles.iconeTopo} />
        </View>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, <Text style={styles.userName}>{firstName}</Text> <Image source={require('../assets/ola.png')} style={styles.ola} /> </Text>
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
      <TextInput style={styles.input} placeholder="Nome" value={userData.username} />
      <TextInput style={styles.input} placeholder="Email" value={userData.email} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={userData.password} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  iconeTopo: {
    width: 30,
    height: 30,
  },
  topBar: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#fff',
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
    borderRadius: 8,
    alignItems: 'center',
  },
  card2: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#EAEAEA',
    fontWeight: 'bold',
  },
  cardTitle2: {
    fontSize: 16,
    color: '#5F5F5F',
    fontWeight: 'bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yellowText: {
    color: '#F26E22',
    fontWeight: 'bold',
    fontSize: 20,
  },
  greenText: {
    color: '#0B8C38',
    fontWeight: 'bold',
    fontSize: 20,
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
    height: 30,
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
    height: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,  // To make the text take up available space
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
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#5F5F5F'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 10,
    marginHorizontal: 16,
  },
});

