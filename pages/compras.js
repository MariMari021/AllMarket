
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';

export function Compras({ route }) {
  const routeParams = route.params ?? {};
  const ultimoValorLimite = routeParams.ultimoValorLimite;
  const { categoriasComTotais = [] } = route.params || {};
  const [categoriaMenorValor, setCategoriaMenorValor] = useState(null);
  const [categoriaMaiorValor, setCategoriaMaiorValor] = useState(null);

  useEffect(() => {
    if (categoriasComTotais.length > 0) {
      const categoriaMenor = categoriasComTotais.reduce((prev, curr) => {
        return parseFloat(curr.total) < parseFloat(prev.total) ? curr : prev;
      });
      setCategoriaMenorValor(categoriaMenor);

      const categoriaMaior = categoriasComTotais.reduce((prev, curr) => {
        return parseFloat(curr.total) > parseFloat(prev.total) ? curr : prev;
      });
      setCategoriaMaiorValor(categoriaMaior);
    }
  }, [categoriasComTotais]);

  const nenhumValorDefinido =
    !ultimoValorLimite &&
    categoriasComTotais.length === 0 &&
    !categoriaMenorValor &&
    !categoriaMaiorValor;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.iconContainer}>
            <Image source={require('../assets/profile.png')} style={styles.iconeTopo} />
            <Image source={require('../assets/logo.png')} style={styles.iconeTopo2} />
          </View>
          <View style={styles.header}>
            <Text style={styles.greeting}>
              <Text style={styles.greenText}>Verifique aqui </Text>
              qual é a melhor opção para você!
            </Text>
          </View>
        </View>
        {nenhumValorDefinido ? (
          <Text>Nenhum valor foi definido</Text>
        ) : (
          <>
            <View>
              <Image
                style={styles.dinheiro}
                source={require('../assets/imgValor.png')}
              />
              <View>
                {ultimoValorLimite ? (
                  <Text>Último valor limite: {ultimoValorLimite}</Text>
                ) : (
                  <Text>Valor não definido</Text>
                )}
              </View>
              <View>
                <Text>Categorias com produtos adicionados:</Text>
                {categoriasComTotais.length > 0 ? (
                  categoriasComTotais.map(({ categoria, total }, index) => (
                    <View key={index}>
                      <Text style={{ marginRight: 5 }}>{categoria}:</Text>
                      <Text>R${total}</Text>
                    </View>
                  ))
                ) : (
                  <Text>Nenhum produto adicionado.</Text>
                )}
              </View>
              {categoriaMenorValor ? (
                <Text>Categoria com menor valor: {categoriaMenorValor.categoria} com R${categoriaMenorValor.total}</Text>
              ) : (
                <Text>Nenhuma categoria com valor definido.</Text>
              )}
              {categoriaMaiorValor ? (
                <Text>Categoria com maior valor: {categoriaMaiorValor.categoria} com R${categoriaMaiorValor.total}</Text>
              ) : (
                <Text>Nenhuma categoria com valor definido.</Text>
              )}
            </View>
          </>
        )}
      </ScrollView>
    );
  };

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