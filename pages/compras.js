
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

export function Compras() {
  const route = useRoute();
  const routeParams = route.params ?? {};
  const ultimoValorLimite = routeParams.ultimoValorLimite;


  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/profile.png')} style={styles.iconeTopo} />
          <Image source={require('../assets/logo.png')} style={styles.iconeTopo2} />
        </View>
        <View style={styles.header}>
          <Text style={styles.greeting}><Text style={styles.greenText}>Verifique aqui </Text>qual é a melhor opção para você!</Text>
        </View>
      </View>
      <View style={styles.precoMax}>
        <Image
          style={styles.dinheiro}
          source={require('../assets/imgValor.png')}
        />
        <View>
          <Text style={styles.InputCompras}>
            Último valor inserido: {ultimoValorLimite}
          </Text>

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
  iconeTopo: {
    marginTop: 10,
    width: 42,
    height: 42,
  },
  iconeTopo2: {
    marginTop: 10,
    width: 158,
    height: 35,
  },
  topBar: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 35,
    marginBottom: 20,
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5F5F5F'
  },
  header: {
    paddingTop: 15
  },
  greenText: {
    color: '#0B8C38',
    fontWeight: 'bold',
  },
  precoMax: {
    flexDirection: "row",
    paddingEnd: 40,
    paddingStart: 40,
    padding: 30,
    alignItems: "center"
  },
  dinheiro: {
    width: 43,
    height: 43,
    marginRight: 15
  },
  input: {
    flex: 1,
    height: 43,
    paddingLeft: 20,
    padding: 10,
    borderWidth: 0.70,
    borderColor: "#B8C8B7",
    borderRadius: 25,
    color: "#000",
    fontFamily: "Inter",
    backgroundColor: "#FFF"
  },

});