import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

export function Perfil() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/profile.png')} style={styles.iconeTopo}/>
          <Image source={require('../assets/sacola.png')} style={styles.iconeTopo}/>
        </View>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, <Text style={styles.userName}>Giovanna</Text> <Image source={require('../assets/ola.png')} style={styles.ola}/> </Text>
          <Text style={styles.subtitle}>Consulte os seus dados.</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}><Text style={styles.yellowText}>Produtos</Text> adicionados</Text>
          <Text style={styles.cardNumber}>16</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver Mais</Text>
            <Image source={require('../assets/setaLaranja.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.card2}>
          <Text style={styles.cardTitle}><Text style={styles.greenText}>Mercados</Text> adicionados</Text>
          <Text style={styles.cardNumber2}>7</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ver Mais</Text>
            <Image source={require('../assets/setaVerde.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Dados</Text>
        <Text style={styles.sectionTitle}>Cadastrados</Text>
      </View>
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  iconeTopo:{
    width: 30,
    height: 30
  },
  topBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 20,
  },
  iconContainer: {
    // Estilo para os ícones no topo
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
 ola:{
  width: 30,
  height: 30
 },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    color: '#007B3A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  button: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#007B3A',
    borderRadius: 20,
    width: 140,
    height: 33
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    marginBottom: 10,
  },
});

