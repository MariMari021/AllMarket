import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export function Inicio({ navigation }) {
    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleBackPress = () => {
        navigation.navigate('Home'); // Navega de volta para a página Index
    };

    return (
        <View style={styles.container}>
            <View style={styles.parteBranca}>
                <View style={styles.header}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Text style={styles.backText}>Voltar</Text>
                        <Image source={require('../assets/setaDireita.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Sua <Text style={styles.orangeText}>experiência</Text> de {'\n'}compras em <Text style={styles.greenText}>um toque!</Text></Text>
                <Image source={require('../assets/inicio.gif')} style={styles.imgPrincipal} />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.buttonText}>Fazer Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B8C38',
        alignItems: 'center',
    },
    parteBranca: {
        backgroundColor: 'white',
        width: '100%',
        height: '84%',
        paddingStart: '8%',
        paddingEnd: '8%',
        paddingTop: '12%',
        paddingBottom: '12%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    logo: {
        width: 155,
        height: 35
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    backText: {
        marginRight: 5,
        color: '#5F5F5F',
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        color: '#5F5F5F',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 95
    },
    orangeText: {
        color: '#F26E22',
        fontWeight: 'bold',
    },
    greenText: {
        color: '#0B8C38',
        fontWeight: 'bold',
    },
    imgPrincipal: {
        alignSelf: 'center',
        width: 250,
        height: 250,

    },
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 310,
        height: 50,
        top: 25
    },
    buttonText: {
        color: '#F26E22',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        top: 10
    },

});

