import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function CardAdicionado({ id, nome, quantidade, preco, onPressRemover, onPressAdicionar, navigation }) {

    const valorTotal = quantidade * preco;

    const adicionarUnidade = async () => {
        const novaQuantidade = quantidade + 1;
        await AsyncStorage.setItem(`produto_${id}`, JSON.stringify(novaQuantidade));
        onPressAdicionar(id, novaQuantidade);
    };

    const removerUnidade = async () => {
        if (quantidade > 1) {
            const novaQuantidade = quantidade - 1;
            await AsyncStorage.setItem(`produto_${id}`, JSON.stringify(novaQuantidade));
            onPressAdicionar(id, novaQuantidade);
        }
    };

    const nomeFormatado = (() => {
        let formattedName = nome.charAt(0).toUpperCase() + nome.slice(1);
        
        if (formattedName.length > 10) {
            formattedName = formattedName.substring(0, 9) + '...';
        }
        
        return formattedName;
    })();

    
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
        <View style={styles.cardAdicionado} onLayout={onLayoutRootView}>
            <Image
                style={styles.imgCardAdicionado}
                source={require('../assets/fotoAdicionado.png')}
            />
            <Text style={styles.tituloAdicionar}>{nomeFormatado}</Text>
            <View style={styles.valores}>
                <TouchableOpacity style={styles.botaoMaisProduto}  onPress={adicionarUnidade}>
                    <Image style={styles.botaoMaisProduto}
                        source={require('../assets/botaoMais.png')}
                    />
                </TouchableOpacity>
                <Text style={styles.quantidade}>{quantidade}</Text>
                <TouchableOpacity style={styles.botaoMenosProduto} onPress={removerUnidade}>
                    <Image style={styles.botaoMenosProduto}
                        source={require('../assets/botaoMenos.png')}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.valorProduto}>R$ {valorTotal.toFixed(2)}</Text>
            <View style={styles.apagarEditar}>
                <TouchableOpacity style={styles.botaoEditar}    onPress={() => onPressRemover(id)}>
                    <Image
                        style={styles.remover}
                        source={require('../assets/apagarCard.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('Produtos', { produto: { id, nome, quantidade, preco } })}>
                    <Image
                        style={styles.maisProduto}
                        source={require('../assets/editar.png')}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardAdicionado: {
        marginRight: 53,
        paddingTop: 10,
        backgroundColor: "#0B8C38",
        minHeight: 325,
        width: 230,
        borderRadius: 22,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.6, // Opacidade da sombra (entre 0 e 1)
        shadowRadius: 10, // Raio da sombra
        elevation: 10,
    },
    valores: {
        paddingTop: 7,
        flexDirection: "row",
        marginStart: "12%",
        alignItems: "center",
    },
    quantidade: {
        paddingStart: 15,
        paddingEnd: 15,
        fontFamily: "Inter",
        fontWeight: "800",
        color: "white",
        fontSize: 19
    },
    botaoMaisProduto: {
        width: 38.2,
        height: 23
    },
    botaoMenosProduto: {
        width: 38.3,
        height: 23
    },
    valorProduto: {
        paddingStart: "12%",
        paddingTop: 10,
        fontFamily: "Inter",
        fontWeight: '900',
        fontSize: 23,
        color: "white"
    },
    tituloAdicionar: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 27,
        color: "#F7AB38",
        marginEnd: "12%",
        marginStart: "12%"
    },
    imgCardAdicionado: {
        width: 115,
        height: 115,
        alignSelf: "flex-end",
        marginTop: 10
    },
    botaoMais: {
        marginEnd: '8%'
    },
    botaoEditar: {
        marginEnd: '8%'
    },
    maisProduto: {
        width: 60,
        height: 60,
        alignSelf: "flex-end",

    },
    remover: {
        width: 43,
        height: 43,
        marginTop: 10

    },
    apagarEditar: {
        flexDirection: "row",
        alignSelf: "flex-end",
        paddingBottom: 15
    }
});
