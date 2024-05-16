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
    !ultimoValorLimite &&
    categoriasComTotais.length === 0 &&
    !categoriaMenorValor &&
    !categoriaMaiorValor;

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
                  <Text style={styles.categorias}>Categorias</Text>
                  {categoriasComTotais.length > 0 ? (
                    categoriasComTotais.map(({ categoria, total }, index) => (
                      <View key={index} >
                        <Text style={styles.categoriaLabel}>{categoria}:</Text>

                        <View style={styles.valorContainer}>
                          <Image
                            source={require('../assets/dinheiro2.png')} // Substitua 'sua_imagem.png' pelo nome do arquivo de imagem
                            style={styles.valorIcone}
                          />
                          <Text style={styles.valorText}>R$</Text>
                          <Text style={styles.valorText}>{total}</Text>
                        </View>

                      </View>
                    ))
                  ) : (
                    <Text>Nenhum produto adicionado.</Text>
                  )}
                </View>
                <View>
                  {categoriaMenorValor ? (
                    <View>
                      <Text style={styles.caixaTextoFora}>Categoria + barata</Text>
                      <View style={styles.caixa}>
                        <Text style={styles.caixaTexto}>{categoriaMenorValor.categoria} R${categoriaMenorValor.total}</Text>
                      </View>
                    </View>
                  ) : (
                    <Text>Nenhuma categoria com valor definido.</Text>
                  )}
                  {categoriaMaiorValor ? (
                    <View>
                      <Text style={styles.caixaTextoFora}>Categoria + cara</Text>
                      <View style={styles.caixa}>
                        <Text style={styles.caixaTexto}>{categoriaMaiorValor.categoria} R${categoriaMaiorValor.total}</Text>
                      </View>
                    </View>
                  ) : (
                    <Text>Nenhuma categoria com valor definido.</Text>
                  )}
                </View>
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
    fontSize: 24,
    color: '#165515'
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
  categoriaLabel: {
    backgroundColor: '#7DBF4E', // cor de fundo verde
    color: '#FFFFFF', // cor do texto branca
    padding: 5, // espaçamento interno
    borderRadius: 15, // borda arredondada
    marginRight: 5, // margem à direita
    width: 130,
    height: 32,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // para distribuir o espaço entre os elementos
    borderRadius: 15, // borda arredondada
    paddingVertical: 5, // espaçamento vertical interno
    paddingHorizontal: 10, // espaçamento horizontal interno
    marginRight: 5, // margem à direita
    backgroundColor: '#FFFFFF', // cor de fundo branca
    borderWidth: 1, // largura da borda
    borderColor: '#7DBF4E', // cor da borda verde
    width: 280,
  },
  valorIcone: {
    width: 34, // ajuste conforme necessário
    height: 34, // ajuste conforme necessário
  },
  valorText: {
    color: '#0B8C38', // cor do texto verde
    fontWeight: 'bold',
  },
  caixa: {
    backgroundColor: '#165515', // cor de fundo verde
    padding: 10, // espaçamento interno
    borderRadius: 5, // borda arredondada
    marginBottom: 10, // margem inferior
    width: 280,
  },
  caixaTexto: {
    color: '#FFFFFF', // cor do texto branco
    fontWeight: 'bold',
    fontSize: 16
  },
  caixaTextoFora: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#5F5F5F'
  },

});

