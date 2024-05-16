import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

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
    (!ultimoValorLimite && categoriasComTotais.length === 0) ||
    (ultimoValorLimite && categoriasComTotais.length === 0 && !categoriaMenorValor && !categoriaMaiorValor);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.centralizarConteudo}>
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
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagem}>
              <Text style={styles.nenhumText}>Nenhum </Text>
              <Text style={styles.valorText}>valor ou {'\n'}categoria definidos.</Text>
            </Text>
          </View>
        ) : (
          <>
            <View style={[styles.precoMax, styles.spacing]}>
              <Image
                style={styles.dinheiro}
                source={require('../assets/imgValor.png')}
              />
              <View style={styles.info}>
                {ultimoValorLimite ? (
                  <Text style={styles.spacing}>Último valor limite: {ultimoValorLimite}</Text>
                ) : (
                  <Text style={styles.spacing}>Valor não definido</Text>
                )}
              </View>
            </View>

            <View style={styles.spacing}>
              <Text style={[styles.categorias, styles.spacing]}>Categorias</Text>
              {categoriasComTotais.length > 0 ? (
                categoriasComTotais.map(({ categoria, total }, index) => (
                  <View key={index} style={styles.spacing}>
                    <Text style={styles.categoriaLabel}>{categoria}:</Text>
                    <View style={styles.valorContainer}>
                      <Image
                        source={require('../assets/dinheiro2.png')}
                        style={styles.valorIcone}
                      />
                      <Text style={styles.valorText}>R$</Text>
                      <Text style={styles.valorText}>{total}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.spacing}>Nenhum produto adicionado.</Text>
              )}
            </View>

            <View style={styles.spacing}>
              {categoriaMenorValor ? (
                <View style={styles.spacing}>
                  <Text style={styles.caixaTextoFora}>Categoria + barata</Text>
                  <View style={styles.caixa}>
                    <Image
                      source={require('../assets/dinheiro.png')}
                      style={styles.caixaIcone}
                    />
                    <Text style={styles.caixaTexto}>{categoriaMenorValor.categoria}</Text>
                    <Text style={styles.caixaValor}>R${categoriaMenorValor.total}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.spacing}>Nenhuma categoria com valor definido.</Text>
              )}
              {categoriaMaiorValor ? (
                <View style={styles.spacing}>
                  <Text style={styles.caixaTextoFora}>Categoria + cara</Text>
                  <View style={styles.caixa}>
                    <Image
                      source={require('../assets/dinheiro.png')}
                      style={styles.caixaIcone}
                    />
                    <Text style={styles.caixaTexto}>{categoriaMaiorValor.categoria}</Text>
                    <Text style={styles.caixaValor}>R${categoriaMaiorValor.total}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.spacing}>Nenhuma categoria com valor definido.</Text>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  centralizarConteudo: {
    alignItems: 'center',
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
  categorias: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#165515'
  },
  dinheiro: {
    width: 43,
    height: 43,
    marginRight: 15
  },
  info: {
    width: 248,
    height: 43,
    paddingLeft: 20,
    padding: 10, 
    borderWidth: 0.70,
    borderColor: "#B8C8B7",
    borderRadius: 25,
    color: "#000",
    fontFamily: "Inter",
    alignItems: 'flex-start',
    backgroundColor: "#FFF"
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
  categoriaLabel: {
    backgroundColor: '#7DBF4E',
    color: '#FFFFFF', 
    padding: 5,
    borderRadius: 15, 
    marginRight: 5, 
    width: 130,
    height: 32,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    borderRadius: 15, 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    marginRight: 5, 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#7DBF4E', 
    width: 316,
    top: 20,
    marginBottom: 40
  },
  valorIcone: {
    width: 39, 
    height: 39, 
  },
  valorText: {
    color: '#5F5F5F', 
    fontWeight: 'bold',
    fontSize: 22
  },
  caixa: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#165515', 
    padding: 10,
    borderRadius: 5, 
    marginBottom: 10,
    width: 316,
    top: 20
  },
  caixaTexto: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 22
  },
  caixaTextoFora: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#5F5F5F'
  },
  caixaIcone: {
    width: 39, 
    height: 39, 
    marginRight: 10, 
  },
  caixaValor: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 20
  },
  spacing: {
    marginBottom: 35, 
  },
  mensagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, 
  },
  mensagem: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nenhumText: {
    color: 'orange', 
  },
});
