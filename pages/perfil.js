import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import { useListas } from './ListasContext';

export function Perfil() {
  const { userId, logout: userLogout } = useUser();
  const { logout: listasLogout } = useListas();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do cadastro:', error);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Calling handleLogout');
      await AsyncStorage.removeItem('userData');
      setUserData({ username: '', email: '', password: '' });
      setIsLoggedIn(false);
      await listasLogout(userId); // Call logout from ListasContext with userId
      await userLogout(); // Call logout from UserContext
      console.log('Logout successful');
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
            <Text style={styles.greeting}>
              Olá, 
              <Text style={styles.username}> {userData.username ? userData.username.split(' ')[0] : ' usuário'}
              </Text>
              <Image source={require('../assets/ola.png')} style={styles.ola} />
            </Text>
            <Text style={styles.subtitle}>Consulte os seus dados.</Text>
          </View>
        </View>
        <View style={styles.tudo}>
          {isLoggedIn ? (
            <>
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}><Text style={styles.yellowText}>Produtos</Text> {'\n'}na lista</Text>
                  <View style={styles.cardContent}>
                    <Image source={require('../assets/sacolaBranca.png')} style={styles.cardIcon} />
                    <Text style={styles.cardNumber}>{totalProdutos}</Text>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaSalva')}>
                    <Text style={styles.buttonText}>Ver Mais</Text>
                    <Image source={require('../assets/setaLaranja.png')} style={styles.buttonIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.card2}>
                  <Text style={styles.cardTitle2}><Text style={styles.greenText}>Listas</Text> adicionadas</Text>
                  <View style={styles.cardContent}>
                    <Image source={require('../assets/categoriaIcon.png')} style={styles.cardIcon} />
                    <Text style={styles.cardNumber2}>{listasSalvas.length}</Text>
                  </View>
                  <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('ListaSalva')}>
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
              <TouchableOpacity style={styles.tutorialButton} onPress={() => navigation.navigate('Tutorial')}>
                <Text style={styles.tutorialButtonText}>Acesse o tutorial</Text>
                <Image source={require('../assets/tutorialIcon.png')} style={styles.tutorialButtonIcon} />
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.loginPromptContainer}>
              <Text style={styles.loginPromptText}>
                Faça <Text style={styles.loginHighlight}>login</Text> para aparecer os dados sobre suas listas!
              </Text>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>Fazer Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  tudo: {
    padding: 16,
  },
  username: {
    color: '#0B8C38', 
  },
  iconeTopo: {
    marginTop: 40,
    width: 40,
    height: 40,
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
    color: '#5F5F5F',
  },
  userName: {
    color: '#007B3A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
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
    width: 150,
    height: 40,
    marginLeft: -6,
  },
  button2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F4884A',
    borderRadius: 20,
    width: 150,
    height: 40,
    marginLeft: -6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 32,
    height: 30,
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
    color: '#5F5F5F',
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
    marginTop: 20,
  },
  input: {
    height: 50,
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
    color: '#F4884A',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 13,
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
  loginPromptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 200, // Ajuste para centralizar verticalmente conforme necessário
  },
  loginPromptText: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingEnd: 40,
    paddingStart: 40
  },
  loginHighlight: {
    color: '#F26E22', // Cor laranja
    fontWeight: 'bold',
    fontSize: 20
  },
  loginButton: {
    backgroundColor: '#0B8C38',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 200,
    height: 40
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tutorialButton: {
    backgroundColor: '#FF7300',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 13,
    marginTop: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 16,
  },
  tutorialButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  tutorialButtonIcon: {
    width: 20,
    height: 20,
  },
});

