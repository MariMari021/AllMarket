import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';


export function Produtos() {
    const [fontsLoaded, fontError] = useFonts({ 'Inter': require('../assets/fonts/Inter-VariableFont_slnt,wght.ttf') });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <ImageBackground
                source={require('../assets/backgroundProdutos.png')} // Substitua pelo caminho da sua imagem
                style={styles.background}
            >
            </ImageBackground> <View style={styles.containerForm}>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.sacolaBranca}
                        source={require('../assets/sacolaBranca.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Insira o nome do produto"
                        placeholderTextColor="#fff"
                    />

                </View>
                <View style={styles.inputDois}>
                    <Image
                        style={styles.adicionar}
                        source={require('../assets/adicionar.png')}
                    />
                    <TextInput
                        style={styles.inputLinha}
                        placeholder="Insira quantas unidades"
                        placeholderTextColor="rgba(00, 00, 00, 0.74)"
                    />
                </View>
                <View style={styles.inputTres}>
                    <Image
                        style={styles.adicionar}
                        source={require('../assets/adicionar.png')}
                    />
                    <TextInput
                        style={styles.inputLinha}
                        placeholder="Insira o preço unitário"
                        placeholderTextColor='rgba(00, 00, 00, 0.74)'
                    />
                </View>
                <TouchableOpacity style={styles.botao}>
                    <Image
                        style={styles.verificado}
                        source={require('../assets/verificado.png')}
                    />
                    <Text style={styles.botaoText}>
                        Adicionar Produto
                    </Text>

                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: "100%",
        flex: 1,
        resizeMode: 'cover', // 'cover' para cobrir todo o contêiner
        // Ajuste o conteúdo verticalmente no centro
    },
    containerForm: {
        padding: 40,
        width: "100%",
        backgroundColor: "#fff",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        height: "60%",
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(11, 140, 56, 0.8)',
        borderRadius: 17,
        paddingHorizontal: 15,
    },
    input: {
        width: 192,
        height: 45,
        fontSize: 16,
        fontFamily: "Inter",
        color: "white",
        fontWeight: "600"
    },
    sacolaBranca: {
        opacity: 1,
        width: 24,
        height: 24,
        marginRight: 10,
    },
    inputDois: {
        flexDirection: "row",
        paddingTop: "13%"
    },
    inputTres: {
        flexDirection: "row",
        paddingTop: "11%"
    },
    adicionar: {
        width: 34,
        height: 34,
        marginRight: '2%'
    },
    inputLinha: {
        borderBottomColor: "#0B8C38",
        borderBottomWidth: 1.7,
        flex: 97 / 100,
        fontFamily: "Inter",
        fontWeight: "500",
        paddingLeft: "2%"
    },
    verificado:{
        width:27,
        height:27
    },
    botao:{
        flexDirection:"row",
        justifyContent:"space-around",
        backgroundColor:"#0B8C38",
        height:45,
        paddingEnd:40,
        paddingStart:40,
        marginTop:42,
        borderRadius:17,
        alignItems:"center"
    },
    botaoText:{
        fontFamily:"Inter",
        fontSize:17,
        fontWeight:"700",
        color:"white"
    }
});
