import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';


export function ListaSalva({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [listasSalvas, setListasSalvas] = useState([]);

    useEffect(() => {
        if (!listasSalvas.length && route.params?.listasSalvas) {
            setListasSalvas(route.params.listasSalvas);
        }
    }, [route.params?.listasSalvas]);

    useEffect(() => {
        console.log("Listas salvas atualizadas:", listasSalvas);
    }, [listasSalvas]);

    useEffect(() => {
        if (route.params?.listasSalvas) {
            console.log("Novas listas salvas recebidas:", route.params.listasSalvas);
            setListasSalvas(prevListas => {
                const novasListas = route.params.listasSalvas.filter(novaLista => !prevListas.some(lista => lista.nome === novaLista.nome));
                return [...prevListas, ...novasListas];
            });
        }
    }, [route.params?.listasSalvas]);



    if (listasSalvas.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Nenhuma lista salva</Text>
                <Text onPress={() => navigation.navigate('Home')}>Voltar</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                {listasSalvas.map((lista, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.listaButton}
                        onPress={() => navigation.navigate('DetalhesLista', { lista: lista })}
                    >
                        <Text style={styles.listaButtonText}>Nome: {lista.nome}</Text>
                        <Text style={styles.listaButtonText}>Categoria: {lista.categoria}</Text>
                        <Text style={styles.listaButtonText}>Data: {lista.data}</Text>
                    </TouchableOpacity>
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                <Text>Funcionou</Text>
                </Modal>
                <Text onPress={() => navigation.navigate('Home')}>Voltar</Text>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    },
    listaButton: {
        padding: 10,
        margin: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    listaButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    produtoContainer: {
        marginBottom: 10,
    },
    produtoText: {
        fontSize: 16,
    },
})
