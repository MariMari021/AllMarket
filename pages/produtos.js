import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from 'react-native';

export function Produtos() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/backgroundProdutos.png')} // Substitua pelo caminho da sua imagem
                style={styles.background}
            >
                <View style={styles.containerForm}>

                    <View style={styles.inputContainer}>
                        <Image
                            style={styles.sacolaBranca}
                            source={require('../assets/sacolaBranca.png')}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite aqui..."
                            placeholderTextColor="#999"
                        />
                    </View>
                </View>


            </ImageBackground>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: "100%",
        flex: 1,
        resizeMode: 'cover', // 'cover' para cobrir todo o contêiner
        justifyContent: 'center', // Ajuste o conteúdo verticalmente no centro
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'rgba(22, 85, 21, 0.85)',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    sacolaBranca: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
});
