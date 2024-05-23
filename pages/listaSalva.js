import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useListas } from './ListasContext';
import { useUser } from './UserContext';

export function ListaSalva({ route, valorLimite, categoriasComTotais }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLista, setSelectedLista] = useState(null);
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const { listasSalvas, setListasSalvas, saveListas } = useListas();
    const { userId } = useUser();

    useEffect(() => {
        if (route.params?.listasSalvas) {
            setListasSalvas(route.params.listasSalvas);
            saveListas(route.params.listasSalvas); // Salva as listas ao receber novas do parâmetro
        }
    }, [route.params?.listasSalvas]);

    useEffect(() => {
        carregarListasSalvas(); // Carrega as listas salvas ao iniciar o componente
    }, []);

    const salvarListas = async (listas) => {
        try {
            const jsonValue = JSON.stringify(listas);
            await AsyncStorage.setItem(`@listasSalvas_${userId}`, jsonValue);
        } catch (error) {
            console.error('Erro ao salvar as listas: ', error);
        }
    };

    const carregarListasSalvas = async () => {
        try {
            const listasSalvasString = await AsyncStorage.getItem(`@listasSalvas_${userId}`);
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

    const excluirLista = async () => {
        const novasListas = listasSalvas.filter((lista) => lista !== selectedLista);
        setListasSalvas(novasListas);
        setModalVisible(false);
        setModalExcluirVisible(false);
        await salvarListas(novasListas); // Salva as listas após excluir
        if (route.params?.atualizarListas) {
            route.params.atualizarListas(novasListas);
        }
        navigation.navigate('ListaSalva', { listasSalvas: novasListas });
    };

    const handleNavigateToCompras = () => {
        navigation.navigate('Compras', { ultimoValorLimite: valorLimite, categoriasComTotais });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerInicio}>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <Image
                            style={styles.profile}
                            source={require('../assets/profile.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={styles.sacola}
                            source={require('../assets/homeIcon.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerLogo}>
                    <Text style={styles.bemVindo}><Text style={styles.subtitulo}>Lista</Text> Salva</Text>
                    <Text style={styles.subtitle}>Consulte as listas que você salvou anteriormente.</Text>
                </View>
            </View>

            {listasSalvas.length === 0 ? ( // Verifica se não há listas salvas
                <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>Fazendo o login</Text>
                    <Text style={styles.emptyListText}>as listas ficam salvas</Text>
                    <Text style={styles.emptyListText}>para sempre!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image
                            style={styles.mais}
                            source={require('../assets/maisIcone.png')}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.content}>
                    {listasSalvas.map((lista, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleListaPress(lista)}
                            style={styles.listaContainer}
                        >
                            <View style={styles.textContainer}>
                                <Text style={styles.nomeLista}>{lista.nome}</Text>
                                <Text style={styles.categoriaLista}>{lista.categoria}</Text>
                                <Text style={styles.dataLista}>{new Date(lista.data).toLocaleDateString()}</Text>
                            </View>
                            <Image source={require('../assets/playIcone.png')} style={styles.playIcon} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{selectedLista?.nome}</Text>
                        <Text style={styles.modalDate}>{new Date(selectedLista?.data).toLocaleDateString()}</Text>
                        <ScrollView
                            style={styles.categoriaScrollViewSalvar}
                            showsVerticalScrollIndicator={true}
                            persistentScrollbar={true}
                        >
                            {selectedLista?.produtos.map((produto, index) => (
                                <View key={index} style={styles.produtoContainer}>
                                    <View style={styles.produtoHeader}>
                                        <View style={styles.produtoIndex}>
                                            <Text style={styles.produtoIndexText}>{index + 1}</Text>
                                        </View>
                                        <Text style={styles.produtoNome}>{produto.nome}</Text>
                                    </View>
                                    <Text style={styles.produtoQuantidade}>Quantidade: {produto.quantidade}</Text>
                                    <Text style={styles.produtoPreco}>Preço unitário: R$ {produto.preco.toFixed(2)}</Text>
                                    <Text style={styles.produtoPreco}>Preço Total: R$ {(produto.quantidade * produto.preco).toFixed(2)}</Text>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={[styles.modalButton, styles.closeButton]}
                            >
                                <Text style={styles.modalButtonText}>Fechar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalExcluirVisible(true)}
                                style={[styles.modalButton, styles.deleteButton]}
                            >
                                <Text style={styles.modalButtonText2}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalExcluirVisible}
                onRequestClose={() => setModalExcluirVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle2}>Tem certeza que deseja excluir esta lista?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={excluirLista}
                                style={[styles.modalButton, styles.deleteButton]}
                            >
                                <Text style={styles.modalButtonText2}>Excluir</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setModalExcluirVisible(false)}
                                style={[styles.modalButton, styles.closeButton]}
                            >
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F9F9F9',
    },
    topBar: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        marginBottom: 40,
        borderBottomEndRadius: 35,
        borderBottomStartRadius: 35,
        backgroundColor: '#fff',
    },
    mais: {
        width: 40,
        height: 40,
        marginTop: 20
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    iconeTopo: {
        width: 42,
        height: 42,
        marginTop: 20
    },
    iconeTopo2: {
        width: 30,
        height: 30,
        marginTop: 20
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#5F5F5F',
        marginLeft: 20
    },
    header: {
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    subtitulo: {
        color: '#0B8C38',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20
    },
    content: {
        paddingEnd: 33,
        paddingStart: 33,
    },
    listaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#88B887',
        padding: 25,
        borderRadius: 19,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 110,
        top: 25
    },
    textContainer: {
        flex: 1,
    },
    nomeLista: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    categoriaLista: {
        fontSize: 19,
        color: '#fff',
        fontWeight: 'bold'
    },
    dataLista: {
        fontSize: 15,
        color: '#5F5F5F',
        fontWeight: 'bold'
    },
    playIcon: {
        width: 42,
        height: 42,
        marginLeft: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B8C38',
        marginBottom: 5,
    },
    modalTitle2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0B8C38',
        marginBottom: 40,
    },
    modalDate: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    produtoContainer: {
        width: '100%',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    produtoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    produtoIndex: {
        backgroundColor: '#FF7F11',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    produtoIndexText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    produtoNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0B8C38'
    },
    produtoQuantidade: {
        fontSize: 16,
        color: '#666',
    },
    produtoPreco: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        padding: 10,
        borderRadius: 25,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#fff',
        borderColor: '#FF7F11',
        borderWidth: 2,
    },
    deleteButton: {
        backgroundColor: '#FF7F11',
    },
    modalButtonText: {
        color: '#FF7F11',
        fontWeight: 'bold',
    },
    modalButtonText2: {
        color: '#ffff',
        fontWeight: 'bold',
    },
    closeModalButtonText: {
        color: '#FF7F11',
    },
    deleteIcon: {
        width: 24,
        height: 24,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '35%'
    },
    emptyListText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#5F5F5F'
    },
    yellowText: {
        color: '#F7AB38',
        fontWeight: 'bold',
    },
    categoriaScrollViewSalvar: {
        maxHeight: 250,
        width: '100%',
        marginBottom: 20,
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
        width: 45,
        height: 45
    },
    sacola: {
        width: 36,
        height: 36
    },
    bemVindo: {
        paddingTop: 20,
        color: 'rgba(0, 0, 0, 0.62)',
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 26
    },
    subtitle: {
        fontSize: 17,
        color: '#666',
    }
});