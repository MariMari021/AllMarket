import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Array de objetos com imagens
const slides = [
  { source: require('../assets/foto2.png') },
  { source: require('../assets/foto3.png') },
  { source: require('../assets/foto4.png') },
  { source: require('../assets/foto1.png') },

];

export function Tutorial({navigation}) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startInterval();

    return () => clearInterval(intervalRef.current);
  }, []);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000); // Muda a imagem a cada 7 segundos
  };

  const handlePress = (idx) => {
    setIndex(idx);
    startInterval();
  };

  const [fontsLoaded, fontError] = useFonts({ 'Inter': require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf') });

  useEffect(() => {
    async function loadData() {
      SplashScreen.preventAutoHideAsync();
    }
    loadData();
  }, []);

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
  
    <ScrollView style={{ height: 50, backgroundColor:'#0B8C38' }}>
      <View style={styles.container}>
        <View style={styles.conteudo}>
          <View style={styles.header}>
            <Image
              style={styles.maisProduto}
              source={require('../assets/logo.png')}
            />
          </View>
          <Text style={styles.dicas}>Dicas de uso</Text>
          <Swiper
            loop={true}
            index={index}
            onIndexChanged={(newIndex) => {
              setIndex(newIndex);
              startInterval();
            }}
            autoplay={false}
            showsPagination={false}
          >
            {slides.map((slide, idx) => (
              <View key={idx} style={styles.slide}>
                <Image source={slide.source} style={styles.media} />
                <View style={styles.pagination}>
                  {slides.map((_, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.dot, index === idx && styles.activeDot]}
                      onPress={() => handlePress(idx)}
                    />
                  ))}
                </View>
              </View>
            ))}
          </Swiper>
        </View>
        <View style={styles.botao}>
          <TouchableOpacity style={styles.fim}onPress={() =>  navigation.navigate('Main', { screen: 'Home' })}>
            <Text style={styles.fimTexto}>Criar listas!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0B8C38",
  },
  botao: {
    backgroundColor: "#0B8C38",
    width: "100%",
    padding: 40,
    paddingEnd: 50,
    paddingStart: 50,
  },
  conteudo: {
    backgroundColor: "#fff",
    width: '100%',
    height: 610,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    paddingTop: "12%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    paddingStart: '12%',
  },
  dicas: {
    paddingTop: '8%',
    paddingBottom: '8%',
    paddingStart: '13%',
    fontFamily: 'Inter',
    fontWeight: '800',
    fontSize: 23,
    color: '#5F5F5F'
  },
  maisProduto: {
    width: 155,
    height: 35,
  },
  pular: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    width: '100%',
  },
  media: {
    borderRadius: 15,
    width: '75%',
    height: '89%',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#F26E22',
  },
  fim: {
    alignItems: 'center',
    width: '100%',
    height: 52,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  fimTexto: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#F26E22',
    fontSize: 19,
  },
});

