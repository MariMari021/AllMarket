import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, Linking } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export function Sobre({ navigation, route, valorLimite, categoriasComTotais }) {
    const [selectedContent, setSelectedContent] = useState('historia'); // Set default state to 'historia'
    const [buttonColors, setButtonColors] = useState({
        historia: { backgroundColor: '#7dbf4e', textColor: 'white' },
        delivery: { backgroundColor: 'white', textColor: 'rgba(0, 0, 0, 0.62)' },
        redesSociais: { backgroundColor: 'white', textColor: 'rgba(0, 0, 0, 0.62)' }
    });

    const handlePress = (content) => {
        if (selectedContent !== content) {
            setSelectedContent(content);
            setButtonColors({
                historia: { backgroundColor: content === 'historia' ? '#7DBF4E' : '#fff', textColor: content === 'historia' ? 'white' : 'rgba(0, 0, 0, 0.62)' },
                delivery: { backgroundColor: content === 'delivery' ? '#7DBF4E' : '#fff', textColor: content === 'delivery' ? 'white' : 'rgba(0, 0, 0, 0.62)' },
                redesSociais: { backgroundColor: content === 'redesSociais' ? '#7DBF4E' : '#fff', textColor: content === 'redesSociais' ? '#fff' : 'rgba(0, 0, 0, 0.62)' }
            });
        }
    };

    const openLink = (url) => {
        Linking.openURL(url);
    };

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

    const handleNavigateToCompras = () => {
        navigation.navigate('Compras', { ultimoValorLimite: valorLimite, categoriasComTotais });
    };

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
                            <TouchableOpacity onPress={handleNavigateToCompras}>
                                <Image
                                    style={styles.sacola}
                                    source={require('../assets/sacola.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerLogo}>
                            <Text style={styles.bemVindo}><Text style={styles.subtitulo}>Conheça +</Text> sobre qualidade Oba Hortifruti.</Text>
                        </View>
                    </View>
                    <View style={styles.localContainer}>
                        <View style={styles.tudoLocal}>
                            <View style={styles.conteudoLocal}>
                                <Text style={styles.textoLocal}>Descubra o Oba Hortifruti mais próximo de você!</Text>
                                <TouchableOpacity style={styles.botaoLocal} onPress={() => openLink('https://www.obahortifruti.com.br/lojas-delivery')}>
                                    <Text style={styles.botaoTexto}>Localizar</Text>
                                </TouchableOpacity>
                            </View>
                            <Image
                                style={styles.imgLocal}
                                source={require('../assets/local.gif')}
                            />
                        </View>
                    </View>
                    <View style={styles.opcoesLado}>
                        <View style={styles.opcoesSobre}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity style={[styles.historia, { backgroundColor: buttonColors.historia.backgroundColor }]} onPress={() => handlePress('historia')}>
                                    <Text style={[styles.adicionarHistoria, { color: buttonColors.historia.textColor }]}>
                                        História
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.delivery, { backgroundColor: buttonColors.delivery.backgroundColor }]} onPress={() => handlePress('delivery')}>
                                    <Text style={[styles.adicionarDelivery, { color: buttonColors.delivery.textColor }]}>
                                        Delivery
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.redesSociais, { backgroundColor: buttonColors.redesSociais.backgroundColor }]} onPress={() => handlePress('redesSociais')}>
                                    <Text style={[styles.adicionarRedes, { color: buttonColors.redesSociais.textColor }]}>
                                        Redes Sociais
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </View>

                        {selectedContent === 'historia' && (
                            <View style={styles.content}>
                                <View style={styles.conteudoHistoria}>
                                    <View style={styles.historiaBlocoUm}>
                                        <Text style={styles.historiaUmTexto}>
                                            O Oba foi criado há 45 anos atrás à partir de um sonho de 2 amigos de Minas Gerais
                                        </Text>
                                    </View>
                                    <View style={styles.historiaBloco}>
                                        <Text style={styles.historiaUmTexto}>
                                            Os dois buscavam levar sáude e bem-estar aos seus clientes
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        {selectedContent === 'delivery' && (
                            <View style={styles.content}>
                                <View style={styles.conteudoHistoria}>
                                    <View style={styles.historiaBlocoUm}>
                                        <Text style={styles.historiaUmTexto}>
                                            Nosso delivery, pode ser feito pelo site ou app, a entrega é feita a partir da efetuação do pagamento.
                                        </Text>
                                    </View>
                                    <View style={styles.historiaBlocoUm}>
                                        <Text style={styles.historiaUmTexto}>
                                            Nossos produtos são estritamente selecionados, apenas alimentos de qualidade e frecos são enviados.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        {selectedContent === 'redesSociais' && (
                            <View style={styles.content}>
                                <View style={styles.conteudoHistoria}>
                                    <View style={styles.redes}>
                                        <View style={styles.blocoIcon}>
                                            <Image
                                                style={styles.imgIcon}
                                                source={require('../assets/webIcon.png')}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.quadrado} onPress={() => openLink('https://www.obahortifruti.com.br/')}>
                                            <Text style={styles.historiaUmTexto}>
                                                Oba Hortifruti Website
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.redes}>
                                        <View style={styles.blocoIcon}>
                                            <Image
                                                style={styles.imgIcon2}
                                                source={require('../assets/instaIcon.png')}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.quadrado} onPress={() => openLink('https://www.instagram.com/obahortifruti/')}>
                                            <Text style={styles.historiaUmTexto}>
                                                @obahortifruti
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.redes}>
                                        <View style={styles.blocoIcon}>
                                            <Image
                                                style={styles.imgIcon3}
                                                source={require('../assets/Vector.png')}
                                            />
                                        </View>
                                        <TouchableOpacity style={styles.quadrado} onPress={() => openLink('https://www.facebook.com/obahortifruti/?locale=pt_BR')}>
                                            <Text style={styles.historiaUmTexto}>
                                                Oba Hortifruti
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
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
        width: 30,
        height: 30
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
    localContainer: {
        paddingTop: 20,
        paddingEnd: 40,
        paddingStart: 40
    },
    tudoLocal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 23,
        paddingEnd: 23,
        padding: 15,
        width: 325,
        height: 145,
        backgroundColor: '#0B8C38',
        borderRadius: 20,
        marginBottom: 50
    },
    imgLocal: {
        width: 100,
        height: 120
    },
    conteudoLocal: {
        width: 147,
    },
    textoLocal: {
        color: "white",
        fontWeight: '600',
        fontSize: 17,
        paddingBottom: 15
    },
    botaoLocal: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 32,
        width: 131,
        justifyContent: 'center',
        borderRadius: 12,

    },
    botaoTexto: {
        fontFamily: 'Inter',
        fontWeight: '700',
        color: 'rgba(255, 93, 0, 1)'

    },
    opcoesLado: {
        paddingEnd: 40,
        paddingStart: 40
    },
    opcoesSobre: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    historia: {
        marginRight: 13,
        width: 130,
        height: 37,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarHistoria: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    delivery: {
        marginRight: 13,
        width: 130,
        height: 37,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarDelivery: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    redesSociais: {
        marginRight: 13,
        width: 150,
        height: 37,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarRedes: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    content: {
        paddingTop: 30,
    },
    historiaBloco: {
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
        padding: 15,
        height: 80,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    historiaBlocoUm: {
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
        padding: 15,
        height: 100,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    historiaUmTexto: {
        color: 'white',
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: '500'
    },
    redes: {
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    imgIcon: {
        width: 35,
        height: 35
    },
    imgIcon2: {
        width: 39,
        height: 39
    },
    imgIcon3: {
        width: 32,
        height: 32
    },
    blocoIcon: {
        width: 55,
        height: 48,
        alignItems: 'center',
        justifyContent: "center",
    },
    quadrado: {
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
        padding: 7,
        width: '80%',
        height: 45,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    }

})