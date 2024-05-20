import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text, Alert, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

export function Produtos({ navigation, route }) {

    const { produto } = route.params || {};
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [modalVisivel, setModalVisivel] = useState(false);
    const [errorModalVisivel, setErrorModalVisivel] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (produto) {
            setNomeProduto(produto.nome);
            setQuantidade(produto.quantidade.toString());
            setPreco(produto.preco.toString());
        }
    }, [produto]);

    useEffect(() => {
        const verificarPreferenciaModal = async () => {
            try {
                const valor = await AsyncStorage.getItem('esconderModal');
                if (valor !== 'true') {
                    setModalVisivel(true);
                }
            } catch (erro) {
                console.error('Falha ao buscar os dados do armazenamento', erro);
            }
        };

        verificarPreferenciaModal();
    }, []);

    const handleNaoMostrarNovamente = async () => {
        try {
            await AsyncStorage.setItem('esconderModal', 'true');
            setModalVisivel(false);
        } catch (erro) {
            console.error('Falha ao salvar os dados no armazenamento', erro);
        }
    };

    const mostrarErro = (mensagem) => {
        setErrorMessage(mensagem);
        setErrorModalVisivel(true);
    };

    const handlePrecoChange = (text) => {
        // Substitui a vírgula por ponto
        const formattedText = text.replace(',', '.');
        setPreco(formattedText);
    };



    const adicionarProduto = () => {
        if (nomeProduto.trim() === '' || quantidade.trim() === '' || preco.trim() === '') {
            mostrarErro('Por favor, preencha todos os campos.');
            return;
        }

        const quant = parseInt(quantidade);
        const price = parseFloat(preco);
        if (isNaN(quant) || quant <= 0 || isNaN(price) || price <= 0) {
            mostrarErro('Por favor, insira uma quantidade e preço válidos.');
            return;
        }

        const produtoAtualizado = {
            id: produto ? produto.id : null,
            nome: nomeProduto,
            quantidade: quant,
            preco: price,
        };

        navigation.navigate('Home', { produto: produtoAtualizado });
    };

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisivel}
                onRequestClose={() => setModalVisivel(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={styles.modalImage}
                            source={require('../assets/bag.jpg')}
                        />
                        <Text style={styles.modalText}>
                            Se o produto possui preço em quilo, a sacola equivale a uma unidade e o preço unitário é o preço da pesagem.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => setModalVisivel(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleNaoMostrarNovamente} style={styles.dontShowAgainButton}>
                                <Text style={styles.dontShowAgainButtonText}>Não mostrar novamente</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisivel}
                onRequestClose={() => setErrorModalVisivel(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{errorMessage}</Text>
                        <TouchableOpacity onPress={() => setErrorModalVisivel(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <ImageBackground
                source={require('../assets/backgroundProdutos.png')}
                style={styles.background}
            >
            </ImageBackground>
            <View style={styles.containerForm}>

                <View style={styles.inputContainer}>
                    <Image
                        style={styles.sacolaBranca}
                        source={require('../assets/sacolaBranca.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Insira o nome do produto"
                        placeholderTextColor="#fff"
                        value={nomeProduto}
                        onChangeText={setNomeProduto}
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
                        keyboardType="numeric"
                        value={quantidade}
                        onChangeText={setQuantidade}
                    />
                </View>
                <View style={styles.inputTres}>
                    <Image
                        style={styles.adicionar}
                        source={require('../assets/adicionar.png')}
                    />
                    <TextInput
                        style={styles.inputLinha}
                        placeholder="Preço"
                        placeholderTextColor='rgba(00, 00, 00, 0.74)'
                        value={preco}
                        onChangeText={handlePrecoChange}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.botao} onPress={adicionarProduto}>
                    <Image
                        style={styles.verificado}
                        source={require('../assets/verificado.png')}
                    />
                    <Text style={styles.botaoText}>
                        Aplicar Dados
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={() =>  navigation.navigate('Main', { screen: 'Home' })}>
                    <Image
                        style={styles.setaEsquerda}
                        source={require('../assets/seta_esquerda.png')}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B8C38',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {

        width: "100%",
        height: '150%',
        flex: 1,
        // resizeMode: 'contain', // 'cover' para cobrir todo o contêiner
        // Ajuste o conteúdo verticalmente no centro
    },
    setaEsquerda: {
        width: 35,
        height: 35,
        marginBottom: 25

    },
    containerForm: {
        padding: 40,
        width: "100%",
        backgroundColor: "#fff",
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        height: "55%",
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(11, 140, 56, 0.8)',
        borderRadius: 17,
        paddingHorizontal: 35,

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
        borderBottomWidth: 1.8,
        flex: 97 / 100,
        fontFamily: "Inter",
        fontWeight: "500",
        paddingLeft: "2%"
    },
    verificado: {
        width: 27,
        height: 27
    },
    botao: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "#0B8C38",
        height: 45,
        paddingEnd: 50,
        paddingStart: 50,
        marginTop: 42,
        borderRadius: 17,
        alignItems: "center",
        marginBottom: 15
    },
    botaoText: {
        fontFamily: "Inter",
        fontSize: 17,
        fontWeight: "700",
        color: "#fff"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro
    },
    modalView: {
        margin: 35,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 33,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontFamily:'Inter',
        fontSize:17    },
    closeButton: {
        backgroundColor: 'rgba(255, 93, 0, 1)',
        width:250,
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        fontSize:18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalImage:{
        width:150,
        height:150
    },
    dontShowAgainButton:{
        paddingTop:10,
        alignItems:'center'
    },
    dontShowAgainButtonText:{
        color:'rgba(0, 0, 0, 0.50)',
        fontSize:15,
        fontWeight:'700'
    }
});