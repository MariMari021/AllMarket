import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export function Compras({ navigation }) {
  const route = useRoute();
  const routeParams = route.params ?? {};
  const { ultimoValorLimite, categoriasComTotais } = routeParams;

  const [categoriaMenorValor, setCategoriaMenorValor] = useState(null);
  const [categoriaMaiorValor, setCategoriaMaiorValor] = useState(null);

  useEffect(() => {
    if (categoriasComTotais && categoriasComTotais.length > 0) {
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
    (!categoriasComTotais || categoriasComTotais.length === 0) &&
    !categoriaMenorValor &&
    !categoriaMaiorValor;


  const [fontsLoaded, fontError] = useFonts({ 'Inter': require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf') });

  useEffect(() => {
    async function loadData() {
      SplashScreen.preventAutoHideAsync();
    }
    loadData();
  }, []);

  useEffect(() => {
    if (route.params?.produto) {
      adicionarProduto(route.params.produto);
    }
  }, [route.params]);

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView style={{ height: '100%' }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
        />
        <View style={styles.centralizarConteudo}>
          <View style={styles.header}>
            <View style={styles.headerInicio}>
              <Image
                style={styles.profile}
                source={require('../assets/profile.png')}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Image
                  style={styles.sacola}
                  source={require('../assets/homeIcon.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerLogo}>
              <Text style={styles.bemVindo}><Text style={styles.subtitulo}>Verifique aqui</Text> as vantagens sobre a sua compra!</Text>
            </View>
          </View>


        <View style={styles.cordefundo}>
          {nenhumValorDefinido ? (
            <View style={styles.mensagemContainer}>
              <Text style={styles.mensagem}>
                <Text style={styles.nenhumText}>Nenhum valor</Text>
                <Text style={styles.valorText}> ou {'\n'}categoria definidos.</Text>
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  style={styles.mais}
                  source={require('../assets/maisIcone.png')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.precoMax}>
                <Image
                  style={styles.dinheiro}
                  source={require('../assets/imgValor.png')}
                />
                <View style={styles.input}>
                  {ultimoValorLimite ? (
                    <Text style={styles.valorLimite}>Valor limite: {ultimoValorLimite}</Text>
                  ) : (
                    <Text style={styles.valorSemLimite}>Limite não definido</Text>
                  )}
                </View>
              </View>

              <View>
                <Text style={styles.categorias}>Categorias</Text>
                {categoriasComTotais.length > 0 ? (
                  categoriasComTotais.map(({ categoria, total }, index) => (
                    <View key={index} style={styles.container}>
                      <View style={styles.destaqueContainer}>
                        <View style={styles.labelDestaque}>
                          <Text style={styles.categoriaLabel}>{categoria}</Text>
                        </View>
                      </View>
                      <View style={styles.containerValorTotal}>
                        <View style={styles.valorTotal}>
                          <View style={styles.resultado}>
                            <Image
                              source={require('../assets/dinheiro2.png')}
                              style={styles.dinheiroBorda}
                            />
                            <Text style={styles.valorTotalPreco}>R$</Text>
                          </View>
                          <Text style={styles.valorTotalPreco}>{total}</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View>
                  </View>
                )}
              </View>

              <View>
                {categoriaMenorValor ? (
                  <View>
                    <Text style={styles.caixaTextoForaBarata}>Categoria + barata</Text>
                    <View style={styles.containerValorTotal}>
                      <View style={styles.valorTotalBarato}>
                        <View style={styles.resultado}>
                          <Image
                            source={require('../assets/dinheiro.png')}
                            style={styles.dinheiro}
                          />
                          <Text style={styles.valorTotalTexto}>{categoriaMenorValor.categoria}</Text>
                        </View>
                        <Text style={styles.valorTotalPrecoBarato}>R${categoriaMenorValor.total}</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.containerSpacing}>
                    <View style={styles.semCategoria}>
                      <Text style={styles.spacing}>Nenhuma categoria com produto adicionado.</Text>
                    </View>
                  </View>
                )}
                {categoriaMaiorValor ? (
                  <View>
                    <Text style={styles.caixaTextoFora}>Categoria + cara</Text>
                    <View style={styles.containerValorTotal}>
                      <View style={styles.valorTotalCaro}>
                        <View style={styles.resultado}>
                          <Image
                            source={require('../assets/dinheiro.png')}
                            style={styles.dinheiro}
                          />
                          <Text style={styles.valorTotalTexto}>{categoriaMaiorValor.categoria}</Text>
                        </View>
                        <Text style={styles.valorTotalPrecoBarato}>R${categoriaMaiorValor.total}</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <Text></Text>
                )}
              </View>
            </>
          )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    borderBottomEndRadius: 35,
    borderBottomStartRadius: 35,
    paddingTop: 35,
    padding: 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.16)'
  },
  cordefundo:{
    backgroundColor: '#f9f9f9',
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
    width: 36,
    height: 36
  },
  bemVindo: {
    paddingTop: 13,
    color: 'rgba(0, 0, 0, 0.62)',
    fontFamily: "Inter",
    fontWeight: "800",
    fontSize: 24,

  },
  subtitulo: {
    color: "#0B8C38",
  },
  mensagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '50%'
  },
  mais: {
    width: 41,
    height: 42
  },
  mensagem: {
    fontFamily: 'Inter',
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#5f5f5f'
  },
  nenhumText: {
    color: "#0B8C38",
    fontWeight: 'bold'
  },
  containerValorTotal: {
    paddingStart: 40,
    paddingEnd: 40,
  },
  valorTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: "8%",
    paddingStart: "8%",
    height: 60,
    borderColor: '#7DBF4E',
    borderWidth: 1.5,
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 7
  },
  resultado: {
    flexDirection: "row",
    alignItems: "center"
  },
  valorTotalPreco: {
    fontFamily: "Inter",
    fontSize: 25,
    fontWeight: "800",
    color: '#7DBF4E',
  },
  dinheiroBorda: {
    width: 43,
    height: 43,
    marginRight: 15
  },
  valorTotalBarato: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: "8%",
    paddingStart: "8%",
    height: 60,
    backgroundColor: "#0B8C38",
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 35
  },
  valorTotalCaro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: "8%",
    paddingStart: "8%",
    height: 60,
    backgroundColor: "#0B8C38",
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 60
  },
  valorTotalTexto: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "800",
    color: "white",
  },
  valorTotalPrecoBarato: {
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: "800",
    color: "#F7AB38",
  },
  dinheiro: {
    width: 43,
    height: 43,
    marginRight: 15
  },
  caixaTextoFora: {
    fontFamily: 'Inter',
    fontSize: 22.7,
    fontWeight: '700',
    paddingEnd: 40,
    paddingStart: 40,
    color: 'rgba(0, 0, 0, 0.72)'
  },
  caixaTextoForaBarata: {
    fontFamily: 'Inter',
    fontSize: 22.7,
    fontWeight: '700',
    paddingEnd: 40,
    paddingStart: 40,
    color: 'rgba(0, 0, 0, 0.72)',
    paddingTop: 35
  },
  categorias: {
    fontFamily: 'Inter',
    fontSize: 26,
    fontWeight: '800',
    paddingEnd: 40,
    paddingStart: 40,
    color: "#0B8C38"
  },

  input: {
    width: 248,
    height: 43,
    paddingLeft: 20,
    padding: 10, // Reduzido o padding para 10
    borderWidth: 0.70,
    borderColor: "#B8C8B7",
    borderRadius: 25,
    color: "#000",
    fontFamily: "Inter",
    alignItems: 'flex-start',
    backgroundColor: "#FFF"
  },
  precoMax: {
    flexDirection: "row",
    paddingEnd: 40,
    paddingStart: 40,
    padding: 30,
    alignItems: "center"

  },
  categoriaLabel: {
    fontFamily: 'Inter',
    fontSize: 17.3,
    color: 'white',

  },
  labelDestaque: {

    width: 137,
    height: 37,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#7DBF4E',
  },
  destaqueContainer: {
    paddingTop: 25,
    paddingEnd: 40,
    paddingStart: 40
  },
  semCategoria: {
    height: 67,
    paddingEnd:15,
    paddingStart:17,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#7DBF4E',
  },
  containerSpacing:{
    paddingTop:15,
    paddingStart:40,
    paddingEnd:40
  },
  spacing:{
    fontFamily:'Inter',
    fontWeight:'600',
    color:"white",
    fontSize:17
  }

})