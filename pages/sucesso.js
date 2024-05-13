import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // Importando o FontAwesome5
import { LinearGradient } from "expo-linear-gradient";

export function Sucesso({ navigation }) {

    const handleVoltar = () => {
        navigation.navigate('Home'); // Navegar de volta para a página Index
    };
    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../assets/fundoSucesso.png')} // Substitua 'background_image.jpg' pelo nome da sua imagem de fundo
                style={styles.backgroundImage}
            >

                <View style={styles.containerHeader}>

                </View>
              
                <View style={styles.containerForm}>

                    <View style={styles.mensagem}>
                        <Image source={require('../assets/logo.png')}
                            style={styles.logo}
                        />
                        <Image source={require('../assets/sucesso.gif')}
                            style={styles.logo2}
                        />
                         <LinearGradient colors={["#F26E22", "#F9B690", "#FFFFFF"]} style={[StyleSheet.background, styles.teste]} >
                                <View style={styles.avcTexto}>
                                    <View style={styles.sol}>
                                        <Text style={styles.titulo2}>
                                            Seja bem vindo (a)
                                        </Text>
                                    </View>
                                    <Text style={styles.subtitulo}>
                                    Seu cadastro foi concluído com sucesso.
                                    </Text>
                                </View>
                                <Image source={require("../assets/concluido.png")} style={styles.avcImg} />
                            </LinearGradient>
                    </View>
                    <TouchableOpacity onPress={handleVoltar}>
                        <Text> {/* Envolver a string em um componente <Text> */}
                            <FontAwesome5 name="arrow-left" size={24} color="#0B8C38" /> {/* Ícone de voltar */}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: '100%',
        height: '30%',
    },
    containerHeader: {
        marginTop: '18%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#FFF"
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%",
        // alignItems: "center"
    },
    title: {
        fontSize: 20,
        marginTop: 28,
        textAlign: 'center'
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        // fontSize: 
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#880000',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    },
    logo: {
        width: 155,
        height: 35,
        alignSelf: 'flex-start'
    },
    logo2: {
        width: 300,
        height: 300
    },
    mensagem: {
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40
    },
    mensagemTexto: {
        width: 300,
        textAlign: "center",
        fontSize: 15.5,
        fontWeight: '700'
    },
    caixaTexto: {
        borderColor: '#f5821f',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    voltar: {
        backgroundColor: '#880000',
        width: 270,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15
    },
    voltarTexto: {
        color: 'white',
        fontSize: 16
    },
    teste: {
        width: 300,
        height: 128,
        borderRadius: 25,
        backgroundColor: '#7485BF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15
    },
    avcTexto: {
        paddingLeft: 7
    },
    titulo2: {
        fontWeight: 'bold',
        fontSize: 19.6,
        color: 'white',
        paddingRight: 60
    },
    subtitulo: {
        fontSize: 14.7,
        width: 170,
        color: 'white',
        fontWeight: '600'

    },
    avcImg: {
        width: 95,
        height: 85
    },
})