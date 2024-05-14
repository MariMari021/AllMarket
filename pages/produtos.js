import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function Produtos({ navigation, route }) {
    
    const { produto } = route.params || {};
    // Obtém o produto passado como parâmetro de navegação

    const [nomeProduto, setNomeProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    useEffect(() => {
        // Verifica se há um produto passado como parâmetro
        if (produto) {
            // Preenche os campos com as informações do produto
            setNomeProduto(produto.nome);
            setQuantidade(produto.quantidade.toString());
            setPreco(produto.preco.toString());
        }
    }, [produto]); // Executa quando o produto muda

    const adicionarProduto = () => {
        // Verifica se todos os campos estão preenchidos
        if (nomeProduto.trim() === '' || quantidade.trim() === '' || preco.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Validar a quantidade e o preço
        const quant = parseInt(quantidade);
        const price = parseFloat(preco);
        if (isNaN(quant) || quant <= 0 || isNaN(price) || price <= 0) {
            alert('Por favor, insira uma quantidade e preço válidos.');
            return;
        }

        // Cria o objeto do novo produto com as informações atualizadas
        const produtoAtualizado = {
            id: produto ? produto.id : null, // Mantém o mesmo ID se estiver editando, caso contrário, é null (indicando um novo produto)
            nome: nomeProduto,
            quantidade: quant,
            preco: price,
        };

        // Navega de volta para a tela Home com o produto atualizado
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
    }

});
