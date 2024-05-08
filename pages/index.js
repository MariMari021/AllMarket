import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState } from 'react';


SplashScreen.preventAutoHideAsync();

export function Home({ navigation }) {
    const [text, setText] = useState('');
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
        <ScrollView style={{ height: 50 }}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <View style={styles.header}>
                    <View style={styles.headerInicio}>
                        <Image
                            style={styles.profile}
                            source={require('../assets/profile.png')}
                        />
                        <Image
                            style={styles.sacola}
                            source={require('../assets/sacola.png')}
                        />
                    </View>
                    <View style={styles.containerLogo}>
                        <Text style={styles.bemVindo}>Seja bem-vindo ao</Text>
                        <Image
                            style={styles.logo}
                            source={require('../assets/logo.png')}
                        />
                    </View>
                </View>

                <View style={styles.precoMax}>
                    <Image
                        style={styles.dinheiro}
                        source={require('../assets/imgValor.png')}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o valor máx. da compra."
                        placeholderTextColor="#000"
                        onChangeText={setText}
                        value={text}
                    />
                </View>
                <View style={styles.mercados}>
                    <Text style={styles.mercadosTitulo}>
                        Categorias
                    </Text>
                    <View style={styles.opcoesMercado}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={styles.adicionarMercado} >
                                <Text style={styles.adicionarMercadoTexto}>
                                    Variados
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarHortifruti} >
                                <Text style={styles.adicionarHortifrutiTexto}>
                                    Hortifruti
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarAdega} >
                                <Text style={styles.adicionarAdegaTexto}>
                                    Adega
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarPadaria} >
                                <Text style={styles.adicionarPadariaTexto}>
                                    Padaria
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarAcougue} >
                                <Text style={styles.adicionarAcougueTexto}>
                                    Açougue
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarMercearia} >
                                <Text style={styles.adicionarMerceariaTexto}>
                                    Mercearia
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarFrios} >
                                <Text style={styles.adicionarFriosTexto}>
                                    Frios
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.adicionarOutros} >
                                <Text style={styles.adicionarOutrosTexto}>
                                    Outros
                                </Text>
                            </TouchableOpacity>
                            

                        </ScrollView>
                    </View>

                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Image
                            style={styles.imgCardAdicionar}
                            source={require('../assets/imgCard1.png')}
                        />
                        <Text style={styles.tituloAdicionar}>
                            Adicionar
                        </Text>
                        <Text style={styles.tituloAdicionarSpan}> o produto!</Text>
                        <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('Produtos')}>
                            <Image
                                style={styles.maisProduto}
                                source={require('../assets/imgMaisProduto.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.limparContainer}>
                    <TouchableOpacity style={styles.apagarTudo}>
                        <Image
                            style={styles.lixo}
                            source={require('../assets/lixo.png')}
                        />
                        <Text style={styles.apagarTudoTexto}>
                            Limpar
                        </Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.containerValorTotal}>
                    <View style={styles.valorTotal}>
                        <View style={styles.resultado}>
                            <Image
                                style={styles.dinheiro}
                                source={require('../assets/dinheiro.png')}
                            />
                            <Text style={styles.valorTotalTexto}>R$</Text>
                        </View>
                        <Text style={styles.valorTotalPreco}>0</Text>

                    </View>

                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',

    },
    header: {
        backgroundColor: "#fff",
        borderBottomEndRadius: 35,
        borderBottomStartRadius: 35,
        padding: 40,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.16)'
    },
    headerInicio: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    profile: {
        width: 50,
        height: 50
    },
    sacola: {
        width: 30,
        height: 30
    },
    bemVindo: {
        paddingTop: 20,
        color: 'rgba(0, 0, 0, 0.62)',
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 26
    },
    logo: {
        width: 150,
        height: 35
    },
    dinheiro: {
        width: 43,
        height: 43,
        marginRight: 15
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
    mercados: {
        paddingTop: 15,
        paddingEnd: 40,
        paddingStart: 40,
    },
    mercadosTitulo: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "900",
        color: "#0B8C38",
        paddingBottom: 15
    },
    opcoesMercado: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    adicionarMercado: {
        marginRight: 13,
        width: 130,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7DBF4E"
    },
    adicionarMercadoTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: '#fff'
    },
    adicionarHortifruti: {
        marginRight: 15,
        width: 134,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarHortifrutiTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarAdega: {
        marginRight: 13,
        width: 113,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarAdegaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarPadaria: {
        marginRight: 13,
        width: 120,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarPadariaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarAcougue: {
        marginRight: 13,
        width: 120,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarAcougueTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarMercearia: {
        marginRight: 13,
        width: 130,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarMerceariaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarFrios: {
        marginRight: 13,
        width: 92,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarFriosTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarOutros: {
        marginRight: 13,
        width: 106,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.44)'
    },
    adicionarOutrosTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarIcon: {
        width: 32,
        height: 32,
    },
    cardContainer: {

        padding: 40,
        alignItems: "center"
    },
    imgCardAdicionar: {
        width: 135,
        height: 135,
        alignSelf: "flex-end",
        marginTop: 15
    },
    card: {
        paddingTop: 10,
        backgroundColor: "#0B8C38",
        height: 325,
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
    botaoMais: {
        marginEnd: '8%'
    },
    maisProduto: {
        width: 60,
        height: 60,
        alignSelf: "flex-end",

    },
    tituloAdicionar: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 27,
        color: "#F7AB38",
        width: 129.8,
        marginStart: "12%"
    },
    tituloAdicionarSpan: {
        fontFamily: "Inter",
        marginStart: "9%",
        fontWeight: "800",
        fontSize: 27,
        color: "#FFf"
    },
    limparContainer: {
        paddingStart: 40,

    },
    apagarTudo: {
        backgroundColor:'#fff',
        flexDirection: "row",
        borderWidth: 1.3,
        borderColor: 'rgba(00, 00, 00, 0.44)',
        padding: 7,
        width: 130,
        justifyContent: "space-around",
        borderRadius: 25,
        alignItems:"center"
    },
    apagarTudoTexto: {
        fontFamily: "Inter",
        fontSize: 17.3,
        fontWeight: "800",
        color: 'rgba(22, 85, 21, 0.85)'
    },
    lixo: {
        width: 22,
        height: 22
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
        backgroundColor: "#0B8C38",
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 50
    },
    resultado: {
        flexDirection: "row",
        alignItems: "center"
    },
    valorTotalTexto: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "800",
        color: "white",
    },
    valorTotalPreco: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "800",
        color: "white",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        color: "#0B8C38"
    },
    modalTextoSpan: {
        fontFamily: "Inter",
        fontWeight: "800",
        color: "#F26E22"
    }


});
