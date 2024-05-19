import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ListaSalva({ route }) {
    const navigation = useNavigation();
    const [listasSalvas, setListasSalvas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLista, setSelectedLista] = useState(null);
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);

    useEffect(() => {
        if (route.params?.listasSalvas) {
            setListasSalvas(route.params.listasSalvas);
            salvarListas(route.params.listasSalvas); // Salva as listas ao receber novas do parâmetro
        }
    }, [route.params?.listasSalvas]);

    useEffect(() => {
        carregarListasSalvas(); // Carrega as listas salvas ao iniciar o componente
    }, []);

    const salvarListas = async (listas) => {
        try {
            await AsyncStorage.setItem('listasSalvas', JSON.stringify(listas));
        } catch (error) {
            console.error('Erro ao salvar as listas: ', error);
        }
    };

    const carregarListasSalvas = async () => {
        try {
            const listasSalvasString = await AsyncStorage.getItem('listasSalvas');
            if (listasSalvasString !== null) {
                setListasSalvas(JSON.parse(listasSalvasString));
            }
        } catch (error) {
            console.error('Erro ao carregar as listas salvas: ', error);
        }
    };

    const handleListaPress = (lista) => {
        setSelectedLista(lista);
        setModalVisible(true);
    };

    const excluirLista = () => {
        const novasListas = listasSalvas.filter(lista => lista !== selectedLista);
        setListasSalvas(novasListas);
        setModalVisible(false);
        setModalExcluirVisible(false);
        salvarListas(novasListas); // Salva as listas após excluir
        if (route.params?.atualizarListas) {
            route.params.atualizarListas(novasListas);
        }
        navigation.navigate('ListaSalva', { listasSalvas: novasListas });
    };

    return (
        <ScrollView>
            <View>
                {listasSalvas.map((lista, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleListaPress(lista)}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
                    >
                        <Text>Nome da Lista: {lista.nome}</Text>
                        <Text>Categoria: {lista.categoria}</Text>
                        <Text>Data: {new Date(lista.data).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Produtos na {selectedLista?.categoria}</Text>
                        {selectedLista?.produtos.map((produto, index) => (
                            <Text key={index}>{produto.nome} - {produto.quantidade} - R$ {produto.preco.toFixed(2)}</Text>
                        ))}
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{ marginTop: 20, padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Fechar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalExcluirVisible(true)}
                            style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExcluirVisible}
                onRequestClose={() => setModalExcluirVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Tem certeza que deseja excluir esta lista?</Text>
                        <TouchableOpacity
                            onPress={excluirLista}
                            style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalExcluirVisible(false)}
                            style={{ marginTop: 20, padding: 10, backgroundColor: '#007BFF', borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
