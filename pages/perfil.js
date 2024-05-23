import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useListas } from './ListasContext'; // Importe o contexto das listas
import { useUser } from './UserContext'; // Importe o contexto de usuário

export function Perfil({ valorLimite, categoriasComTotais }) {
  const navigation = useNavigation();
  const { listasSalvas, totalProdutos } = useListas();
  const { userId, isAnonymous, logout } = useUser();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('user_email');
        if (savedEmail) {
          const storedUserData = await AsyncStorage.getItem(savedEmail);
          if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do cadastro:', error);
      }
    };

    if (!isAnonymous) {
      getUserData();
    }
  }, [isAnonymous]);

  const numListasSalvas = listasSalvas.length;
  const firstName = !isAnonymous && userData.username ? userData.username.split(' ')[0] : 'Anônimo';

  const handleNavigateToCompras = () => {
    navigation.navigate('Compras', { ultimoValorLimite: valorLimite, categoriasComTotais });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header2}>
          <View style={styles.headerInicio}>
            <Image
              style={styles.profile}
              source={require('../assets/profile.png')}
            />
            <TouchableOpacity onPress={handleNavigateToCompras}>
              <Image
                style={styles.sacola}
                source={require('../assets/sacola.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <Text style={styles.greeting}>Olá, <Text style={styles.userName}>{firstName}</Text> <Image source={require('../assets/ola.png')} style={styles.ola} /> </Text>
            <Text style={styles.subtitle}>Consulte os seus dados.</Text>
          </View>
        </View>
        <View style={styles.tudo}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}><Text style={styles.yellowText}>Produtos</Text>{'\n'}na lista</Text>
              <View style={styles.cardContent}>
                <Image source={require('../assets/sacolaBranca.png')} style={styles.cardIcon} />
                <Text style={styles.cardNumber}>{totalProdutos}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaSalva')}>
                <Text style={styles.buttonText}>Ver Mais</Text>
                <Image source={require('../assets/playIcone.png')} style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.card2}>
              <Text style={styles.cardTitle2}><Text style={styles.greenText}>Listas</Text> adicionadas</Text>
              <View style={styles.cardContent}>
                <Image source={require('../assets/categoriaIcon.png')} style={styles.cardIcon} />
                <Text style={styles.cardNumber2}>{numListasSalvas}</Text>
              </View>
              <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('ListaSalva')}>
                <Text style={styles.buttonText}>Ver Mais</Text>
                <Image source={require('../assets/playIcone2.png')} style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {!isAnonymous ? (
            <>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>Dados {'\n'}Cadastrados</Text>
              </View>
              <View style={styles.inputContainer}>
                <Image source={require('../assets/profile.png')} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Nome" value={userData.username} editable={false} />
              </View>
              <View style={styles.inputContainer}>
                <Image source={require('../assets/emailIcon.png')} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Email" value={userData.email} editable={false} />
              </View>
              <View style={styles.inputContainerCadastro}>
                <Image source={require('../assets/senhaIcon.png')} style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={userData.password} editable={false} />
              </View>
            </>
          ) : (
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Você está logado como anônimo.</Text>
            </View>
          )}
          <View style={styles.verTutorial}>
            <TouchableOpacity style={styles.botaoTutorial} onPress={handleLogout}>
              <Text style={styles.tutorialTexto}>Fazer logout</Text>
              <Image source={require('../assets/setaDireita.png')} style={styles.setaVerde} />
            </TouchableOpacity>
          </View>
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
  headerInicio: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profile: {
    width: 45,
    height: 45
  },
  sacola: {
    width: 30,
    height: 30
  },
  header2: {
    backgroundColor: "#fff",
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    padding: 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.16)'

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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5F5F5F',
    top: 10
  },
  userName: {
    color: '#007B3A',
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    top: 13,
    paddingBottom: 20
  },
  tudo: {
    padding: 20
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 16,
    top: 20
  },
  card: {
    width: '48%',
    padding: 16,
    backgroundColor: '#0B8C38',
    borderRadius: 25,
    alignItems: 'center',
  },
  card2: {
    width: '48%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 25,
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
    color: "#F7AB38",
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
    height: 40,
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
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,  // To make the text take up available space
    textAlign: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    marginRight: 5,
    color: '#5F5F5F',
    top: 20,
    marginBottom: 20
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
  inputContainerCadastro: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 17,
    marginBottom: 33,
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
  verTutorial: {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop:20,
  },
  verCadastro: {
    paddingStart: 16,
    paddingEnd: 16,
  },
  botaoTutorial: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.36)',
    height: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 38,
    paddingStart: 38,
    backgroundColor: 'white'
  },
  setaVerde: {
    width: 34,
    height: 34
  },
  tutorialTexto: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F26E22'
  }
});