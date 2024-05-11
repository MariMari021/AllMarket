import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; // Importando o FontAwesome5
import { ScrollView } from 'react-native-gesture-handler';

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
                            <View style={styles.caixaTexto}>
                                <Text style={styles.mensagemTexto}>
                                    Seja bem-vindo(a)! Seu cadastro foi concluído com sucesso.
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleVoltar}> {/* Adicionando um TouchableOpacity para tornar o ícone clicável */}
                            <FontAwesome5 name="arrow-left" size={24} color="#0B8C38" /> {/* Ícone de voltar */}
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
    voltar: {
        
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
    }
})