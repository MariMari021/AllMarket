import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, SafeAreaView } from 'react-native';

export function Inicio({ navigation }) {
    const handleLoginPress = () => {
        navigation.navigate('Cadastro');
    };

    const handleBackPress = () => {
        navigation.navigate('Tutorial'); // Navega de volta para a página Index
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.parteBranca}>
                        <View style={styles.header}>
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                                <Text style={styles.backText}>Pular</Text>
                                <Image source={require('../assets/setaDireita.png')} style={styles.backIcon} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>Sua <Text style={styles.orangeText}>experiência</Text> de {'\n'}compras em <Text style={styles.greenText}>um toque!</Text></Text>
                        <Image source={require('../assets/inicio.gif')} style={styles.imgPrincipal} />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                        <Text style={styles.buttonText}>Cadastre-se!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0B8C38',
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    parteBranca: {
        backgroundColor: 'white',
        width: '100%',
        paddingStart: '8%',
        paddingEnd: '8%',
        paddingTop: '12%',
        paddingBottom: '22%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height:'83%'
    },
    logo: {
        width: 155,
        height: 35,
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
        fontSize: 16,
    },
    text: {
        color: '#5F5F5F',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 80,
        marginBottom: '25%',
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
        width: 290,
        height: 290,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        width: 310,
        height: 50,
        marginTop: 43,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    buttonText: {
        color: '#F26E22',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


