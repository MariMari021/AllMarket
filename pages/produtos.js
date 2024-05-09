import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function Produtos({ navigation }) {
    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    const adicionarProduto = () => {
        // Verificar se todos os campos estão preenchidos
        if (nomeProduto.trim() === '' || quantidade.trim() === '' || preco.trim() === '') {
            Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
            return;
        }

        // Validar a quantidade e o preço
        const quant = parseInt(quantidade);
        const price = parseFloat(preco);
        if (isNaN(quant) || quant <= 0 || isNaN(price) || price <= 0) {
            Alert.alert('Atenção', 'Por favor, insira uma quantidade e preço válidos.');
            return;
        }

        // Simular a adição do produto ao estado global ou local
        const novoProduto = {
            nome: nomeProduto,
            quantidade: quant,
            preco: price,
        };

        // Limpar os campos após adicionar o produto
        setNomeProduto('');
        setQuantidade('');
        setPreco('');

        // Informar ao usuário que o produto foi adicionado
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!', [
            { text: 'OK', onPress: () => navigation.navigate('Home', { novoProduto }) }
        ]);
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
                        placeholder="Insira o preço unitário"
                        placeholderTextColor='rgba(00, 00, 00, 0.74)'
                        keyboardType="numeric"
                        value={preco}
                        onChangeText={setPreco}
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
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
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
        marginBottom:25

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
    }

});
