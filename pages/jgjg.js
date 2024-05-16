// Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Image } from 'react-native';

export function Home({ navigation }) {
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);
    const [categoriaParaSalvar, setCategoriaParaSalvar] = useState('');
    const [nomeDaLista, setNomeDaLista] = useState('');
    const [listasSalvas, setListasSalvas] = useState([]);
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [modalCategoriaJaSalvaVisible, setModalCategoriaJaSalvaVisible] = useState(false);

    const salvarLista = () => {
        const produtosNaCategoria = produtosAdicionados.filter(produto => produto.categoria === categoriaParaSalvar);
        if (produtosNaCategoria.length > 0) {
            const ultimaListaSalva = listasSalvas.find(lista => lista.categoria === categoriaParaSalvar);

            const produtosSaoIguais = (produtos1, produtos2) => {
                if (produtos1.length !== produtos2.length) return false;
                return produtos1.every((produto, index) => {
                    return produto.id === produtos2[index].id &&
                           produto.nome === produtos2[index].nome &&
                           produto.quantidade === produtos2[index].quantidade &&
                           produto.preco === produtos2[index].preco;
                });
            };

            if (!ultimaListaSalva || !produtosSaoIguais(ultimaListaSalva.produtos, produtosNaCategoria)) {
                const novasListasSalvas = [...listasSalvas, { nome: nomeDaLista, categoria: categoriaParaSalvar, produtos: produtosNaCategoria, data: new Date() }];
                setListasSalvas(novasListasSalvas);
                setModalSalvarVisible(false);
                navigation.navigate('ListaSalva', { listasSalvas: novasListasSalvas });
            } else {
                setModalCategoriaJaSalvaVisible(true);
                setModalSalvarVisible(false);
            }
        } else {
            setModalSalvarVisible(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Seu código aqui */}

            <TouchableOpacity onPress={() => setModalSalvarVisible(true)} style={styles.salvarTudo}>
                <Image style={styles.lixo} source={require('../assets/adicionar.png')} />
                <Text style={styles.apagarTudoTexto}>Salvar lista</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSalvarVisible}
                onRequestClose={() => setModalSalvarVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione a categoria para salvar:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a categoria"
                            value={categoriaParaSalvar}
                            onChangeText={setCategoriaParaSalvar}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome da lista"
                            value={nomeDaLista}
                            onChangeText={setNomeDaLista}
                        />
                        <TouchableOpacity onPress={salvarLista} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalSalvarVisible(false)}
                            style={[styles.modalButton, styles.cancelButton]}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCategoriaJaSalvaVisible}
                onRequestClose={() => setModalCategoriaJaSalvaVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Categoria já salva com os mesmos produtos.</Text>
                        <TouchableOpacity
                            onPress={() => setModalCategoriaJaSalvaVisible(false)}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// ListaSalva.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

export function ListaSalva({ route }) {
    const [listasSalvas, setListasSalvas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLista, setSelectedLista] = useState(null);

    useEffect(() => {
        if (route.params?.listasSalvas) {
            setListasSalvas(route.params.listasSalvas);
        }
    }, [route.params?.listasSalvas]);

    const handleListaPress = (lista) => {
        setSelectedLista(lista);
        setModalVisible(true);
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
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}
