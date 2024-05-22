import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CardAdicionado } from './cardAdicionado'; // Importe o componente CardAdicionado, se necessário
import { useFonts } from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as SplashScreen from 'expo-splash-screen';


export function Home({ route, navigation }) {
    const [nextId, setNextId] = useState(0); // Inicialize nextId com 0
    const [modalNenhumProdutoVisible, setModalNenhumProdutoVisible] = useState(false);
    const [produtosAdicionados, setProdutosAdicionados] = useState([]);
    const [temCardAdicionado, setTemCardAdicionado] = useState(false);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    const [totalPreco, setTotalPreco] = useState(0); // Estado para armazenar o total do preço dos produtos
    const [preco, setPreco] = useState('');
    const [valorLimite, setValorLimite] = useState('');
    const [categoriasComTotais, setCategoriasComTotais] = useState([]);
    const [categoriasComProdutos, setCategoriaComProdutos] = useState([]);
    const [limiteUltrapassado, setLimiteUltrapassado] = useState(false); // Estado para controlar se o limite foi ultrapassado
    // Defina um estado para a quantidade do produto
    const [quantidade, setQuantidade] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Variados'); // Define "Categoria1" como categoria inicial selecionada
    const [scrollStates, setScrollStates] = useState({});
    const [nomeProduto, setNomeProduto] = useState('');
    const [modalAdicionarCardVisible, setModalAdicionarCardVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalListaSalva, setModalListaSalva] = useState(false);
    const [modalCategoriaJaSalvaVisible, setModalCategoriaJaSalvaVisible] = useState(false);
    const [modalSalvarVisible, setModalSalvarVisible] = useState(false);
    const [categoriaParaSalvar, setCategoriaParaSalvar] = useState('');
    const [nomeDaLista, setNomeDaLista] = useState('');
    const [listasSalvas, setListasSalvas] = useState([]);
    const [modalListaExistenteVisible, setModalListaExistenteVisible] = useState(false);
    const [modalListaSalvaSucessoVisible, setModalListaSalvaSucessoVisible] = useState(false);



    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.listasSalvas) {
                setListasSalvas(route.params.listasSalvas);
            }
        }, [route.params?.listasSalvas])
    );

    useEffect(() => {
        if (!modalSalvarVisible) {
            setNomeDaLista('');
            setCategoriaParaSalvar('');
        }
    }, [modalSalvarVisible]);

    const salvarLista = async () => {
        const produtosNaCategoria = produtosAdicionados.filter(produto => produto.categoria === selectedCategory);

        if (produtosNaCategoria.length === 0) {
            setModalNenhumProdutoVisible(true);
            setModalSalvarVisible(false);
            return;
        }

        const novaLista = {
            nome: nomeDaLista,
            categoria: selectedCategory,
            produtos: produtosNaCategoria,
            data: new Date().toISOString(),
        };

        const listaExistente = listasSalvas.some(lista =>
            lista.nome === nomeDaLista &&
            lista.categoria === selectedCategory &&
            lista.produtos.length === produtosNaCategoria.length &&
            lista.produtos.every((produto, index) => (
                produto.nome === produtosNaCategoria[index].nome &&
                produto.quantidade === produtosNaCategoria[index].quantidade &&
                produto.preco === produtosNaCategoria[index].preco
            ))
        );

        if (listaExistente) {
            setModalListaExistenteVisible(true);
            setModalSalvarVisible(false);
            return;
        }

        const novasListasSalvas = [...listasSalvas, novaLista];
        setListasSalvas(novasListasSalvas);
        await saveListas(novasListasSalvas);
        setModalSalvarVisible(false);
        setModalListaSalvaSucessoVisible(true);

        navigation.navigate('ListaSalva', { listasSalvas: novasListasSalvas });
    };




    useFocusEffect(
        React.useCallback(() => {
            const carregarListasSalvas = async () => {
                try {
                    const listasSalvasString = await AsyncStorage.getItem('@listasSalvas');
                    if (listasSalvasString !== null) {
                        setListasSalvas(JSON.parse(listasSalvasString));
                    }
                } catch (error) {
                    console.error('Erro ao carregar as listas salvas: ', error);
                }
            };
            carregarListasSalvas();
        }, [])
    );

    const saveListas = async (listas) => {
        try {
            const jsonValue = JSON.stringify(listas);
            await AsyncStorage.setItem('@listasSalvas', jsonValue);
        } catch (e) {
            console.error('Failed to save the lists to storage', e);
        }
    };

    const loadListas = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@listasSalvas');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Failed to load the lists from storage', e);
        }
    };


    useEffect(() => {
        const fetchListas = async () => {
            const listas = await loadListas();
            setListasSalvas(listas);
        };
        fetchListas();
    }, []);

    useEffect(() => {
        saveListas(listasSalvas);
    }, [listasSalvas]);





    // UseEffect para atualizar as categorias com produtos sempre que houver uma mudança em produtosAdicionados
    useEffect(() => {
        const categoriasComProdutos = getCategoriasComProdutos();
        setCategoriaComProdutos(categoriasComProdutos);
    }, [produtosAdicionados]);

    // Função para determinar quais categorias têm produtos adicionados
    const getCategoriasComProdutos = () => {
        const categoriasComProdutos = [];
        categoriasSelecionadas.forEach(categoria => {
            if (produtosAdicionados.some(produto => produto.categoria === categoria)) {
                categoriasComProdutos.push(categoria);
            }
        });
        return categoriasComProdutos;
    };

    // Função para lidar com a seleção de uma categoria
    const handleCategoryPress = (categoria) => {
        setSelectedCategory(categoria);
    };



    const handleValorLimiteChange = (value) => {
        setValorLimite(value);
    };



    useEffect(() => {
        if (produtosAdicionados.length > 0) {
            setTemCardAdicionado(true);
        } else {
            setTemCardAdicionado(false);
        }
    }, [produtosAdicionados]);



    const handleScroll = (event, category) => {
        const { contentOffset } = event.nativeEvent;
        setScrollStates(prevState => ({
            ...prevState,
            [category]: contentOffset
        }));
    };

    const onPressAdicionar = (id, novaQuantidade) => {
        // Atualize o estado de quantidade do produto com o novo valor
        setProdutosAdicionados(produtosAdicionados.map(produto => produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto));
    };

    const renderCategoryScrollView = (category, imgSource) => {
        return (
            <ScrollView
                key={category}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => handleScroll(event, category)}
                scrollEventThrottle={16}
            >
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Image
                            style={styles.imgCardAdicionar}
                            source={imgSource}
                        />
                        <Text style={styles.tituloAdicionar}>
                            Adicionar
                        </Text>
                        <Text style={styles.tituloAdicionarSpan}> o produto!</Text>
                        <TouchableOpacity style={styles.botaoMais} onPress={() => navigation.navigate('Produtos')}>
                            <Image
                                style={styles.maisProduto}
                                source={require('../assets/imgMaisProduto.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    {produtosAdicionados
                        .filter(produto => produto.categoria === selectedCategory)
                        .map((produto) => (
                            <CardAdicionado
                                key={produto.id}
                                id={produto.id}
                                nome={produto.nome}
                                quantidade={produto.quantidade}
                                preco={produto.preco}
                                onPressRemover={removerProduto}
                                onPressEditar={editarProduto}
                                onPressAdicionar={onPressAdicionar}
                                navigation={navigation}
                            />
                        ))}
                </View>
            </ScrollView>
        );
    };



    const getCategoryScrollView = (category) => {
        switch (category) {
            case 'Variados':
                return renderCategoryScrollView(category, require('../assets/imgCard1.png'));
            case 'Hortifruti':
                return renderCategoryScrollView(category, require('../assets/frutas.png'));
            case 'Adega':
                return renderCategoryScrollView(category, require('../assets/adega.png'));
            case 'Padaria':
                return renderCategoryScrollView(category, require('../assets/padaria.png'));
            case 'Açougue':
                return renderCategoryScrollView(category, require('../assets/acougue.png'));
            case 'Mercearia':
                return renderCategoryScrollView(category, require('../assets/mercearia.png'));
            case 'Frios':
                return renderCategoryScrollView(category, require('../assets/frios.png'));
            case 'Outros':
                return renderCategoryScrollView(category, require('../assets/outros.png'));
            // Adicione mais casos conforme necessário para outras categorias
            default:
                return null;
        }
    };


    const toggleCategoriaSelecionada = (categoria) => {
        setCategoriasSelecionadas(prevState =>
            prevState.includes(categoria)
                ? prevState.filter(item => item !== categoria)
                : [...prevState, categoria]
        );
    };

    const limparCategoriasSelecionadas = () => {
        if (produtosAdicionados.length > 0) {
            const novosProdutos = produtosAdicionados.filter(produto => !categoriasSelecionadas.includes(produto.categoria));

            let total = 0;
            novosProdutos.forEach(produto => {
                total += produto.preco * produto.quantidade;
            });

            setProdutosAdicionados(novosProdutos);
            setTotalPreco(total);
            setCategoriasSelecionadas([]);
            if (total > 0) {
                setModalVisible(true);
            }
        } else {
            if (totalPreco === 0) {
                setModalAdicionarCardVisible(true);
            } else {
                setModalVisible(true);
            }
        }
    };


    useEffect(() => {
        console.log("Modal visibility changed:", modalVisible);
    }, [modalVisible]);



    const generateUniqueId = () => {
        const id = `id_${nextId}`;
        setNextId(prevId => prevId + 1);
        return id;
    };


    // Adicionar produto
    const adicionarProduto = async (produto) => {
        const produtoComCategoria = { ...produto, categoria: selectedCategory };
        if (!produtoComCategoria.id) {
            produtoComCategoria.id = generateUniqueId();
        }
        const novosProdutosAdicionados = produtosAdicionados.filter(p => p.id !== produtoComCategoria.id);
        novosProdutosAdicionados.push(produtoComCategoria);
        setProdutosAdicionados(novosProdutosAdicionados);
        await saveProdutos(novosProdutosAdicionados);
    };




    useEffect(() => {
        const categorias = produtosAdicionados.reduce((acc, produto) => {
            const { categoria, preco, quantidade } = produto;
            if (!acc[categoria]) {
                acc[categoria] = 0;
            }
            acc[categoria] += preco * quantidade;
            return acc;
        }, {});

        setCategoriasComTotais(Object.entries(categorias).map(([categoria, total]) => ({
            categoria,
            total: total.toFixed(2) // Formata o total para duas casas decimais
        })));
    }, [produtosAdicionados]);




    const removerProduto = async (idParaRemover) => {
        const indexToRemove = produtosAdicionados.findIndex(produto => produto.id === idParaRemover);

        if (indexToRemove !== -1) {
            const newProdutosAdicionados = [...produtosAdicionados];
            newProdutosAdicionados.splice(indexToRemove, 1);
            setProdutosAdicionados(newProdutosAdicionados);
            await saveProdutos(newProdutosAdicionados);
        }
    };


    const saveProdutos = async (produtos) => {
        try {
            const jsonValue = JSON.stringify(produtos);
            await AsyncStorage.setItem('@produtosAdicionados', jsonValue);
        } catch (e) {
            console.error('Failed to save the data to the storage', e);
        }
    };

    const loadProdutos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@produtosAdicionados');
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            console.error('Failed to load the data from the storage', e);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const produtos = await loadProdutos();
            setProdutosAdicionados(produtos);
    
            // Inicializando nextId com o maior ID atual + 1
            const maxId = produtos.reduce((max, produto) => {
                const idNum = parseInt(produto.id.split('_')[1], 10); // Parsing to integer
                return !isNaN(idNum) ? Math.max(max, idNum) : max;
            }, 0);
            setNextId(maxId + 1);
        };
        fetchData();
    }, []);
    


    useEffect(() => {
        console.log("Produtos carregados:", produtosAdicionados);
        const produtosUnicos = new Set(produtosAdicionados.map(p => p.id));
        if (produtosUnicos.size !== produtosAdicionados.length) {
            console.error("Produtos com IDs duplicados detectados!");
        }
    }, [produtosAdicionados]);





    const editarProduto = async (produtoEditado) => {
        const index = produtosAdicionados.findIndex(p => p.id === produtoEditado.id);
        if (index !== -1) {
            const novosProdutosAdicionados = [...produtosAdicionados];
            novosProdutosAdicionados[index] = { ...novosProdutosAdicionados[index], ...produtoEditado };
            setProdutosAdicionados(novosProdutosAdicionados);
            await saveProdutos(novosProdutosAdicionados);
        } else {
            console.error("Produto não encontrado para edição!");
        }
    };
    




    useEffect(() => {
        saveProdutos(produtosAdicionados);
    }, [produtosAdicionados]);


    useEffect(() => {
        if (route.params && route.params.novoProduto) {
            const novoProduto = route.params.novoProduto;
            adicionarProduto(novoProduto);
        }
    }, [route.params]);

    useEffect(() => {
        let total = 0;
        produtosAdicionados.forEach(produto => {
            total += produto.preco * produto.quantidade;
        });
        setTotalPreco(total);
    }, [produtosAdicionados]);

    useEffect(() => {
        console.log('Valor limite atual:', valorLimite);
        const limite = parseFloat(valorLimite);
        setLimiteUltrapassado(totalPreco > limite);
    }, [totalPreco, valorLimite]);


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
        <ScrollView style={{ height: 50 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerInicio}>
                        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                            <Image
                                style={styles.profile}
                                source={require('../assets/profile.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNavigateToCompras}>
                            <Image
                                style={styles.sacola}
                                source={require('../assets/sacola.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerLogo}>
                        <Text style={styles.bemVindo}>Seja bem-vindo ao</Text>
                        <Image
                            style={styles.logo}
                            source={require('../assets/logo.png')}
                        />
                    </View>
                </View>

                <View style={styles.precoMax}>
                    <Image
                        style={styles.dinheiro}
                        source={require('../assets/imgValor.png')}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o valor máx. da compra."
                        placeholderTextColor="#000"
                        keyboardType="numeric"
                        onChangeText={handleValorLimiteChange}
                        value={valorLimite}
                    />
                </View>


                <View style={styles.mercados}>
                    <Text style={styles.mercadosTitulo}>
                        Categorias
                    </Text>
                    <View style={styles.opcoesMercado}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={[
                                styles.adicionarMercado,
                                selectedCategory === 'Variados' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Variados')}>
                                <Text style={[
                                    styles.adicionarMercadoTexto,
                                    selectedCategory === 'Variados' && { color: 'white' },
                                ]}>
                                    Variados
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.adicionarHortifruti,
                                    selectedCategory === 'Hortifruti' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                                ]}
                                onPress={() => handleCategoryPress('Hortifruti')}>
                                <Text style={[
                                    styles.adicionarHortifrutiTexto,
                                    selectedCategory === 'Hortifruti' && { color: 'white' },
                                ]}>Hortifruti</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[
                                styles.adicionarAdega,
                                selectedCategory === 'Adega' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Adega')} >
                                <Text style={[
                                    styles.adicionarAdegaTexto,
                                    selectedCategory === 'Adega' && { color: 'white' },
                                ]}>
                                    Adega
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.adicionarPadaria,
                                selectedCategory === 'Padaria' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Padaria')} >
                                <Text style={[
                                    styles.adicionarPadariaTexto,
                                    selectedCategory === 'Padaria' && { color: 'white' },
                                ]}>
                                    Padaria
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.adicionarAcougue,
                                selectedCategory === 'Açougue' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Açougue')}>
                                <Text style={[
                                    styles.adicionarAcougueTexto,
                                    selectedCategory === 'Açougue' && { color: 'white' },
                                ]}>
                                    Açougue
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.adicionarMercearia,
                                selectedCategory === 'Mercearia' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Mercearia')}>
                                <Text style={[
                                    styles.adicionarMerceariaTexto,
                                    selectedCategory === 'Mercearia' && { color: 'white' },
                                ]}>
                                    Mercearia
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.adicionarFrios,
                                selectedCategory === 'Frios' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Frios')} >
                                <Text style={[
                                    styles.adicionarFriosTexto,
                                    selectedCategory === 'Frios' && { color: 'white' },
                                ]}>
                                    Frios
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[
                                styles.adicionarOutros,
                                selectedCategory === 'Outros' && { backgroundColor: "#7DBF4E", borderColor: "white" },
                            ]} onPress={() => handleCategoryPress('Outros')}>
                                <Text style={[
                                    styles.adicionarOutrosTexto,
                                    selectedCategory === 'Outros' && { color: 'white' },
                                ]}>
                                    Outros
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                {selectedCategory && getCategoryScrollView(selectedCategory)}
                <View style={styles.limparContainer}>
                    <TouchableOpacity
                        style={styles.apagarTudo}
                        onPress={limparCategoriasSelecionadas}
                    >
                        <Image
                            style={styles.lixo}
                            source={require('../assets/lixo.png')}
                        />
                        <Text style={styles.apagarTudoTexto}>
                            Limpar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalSalvarVisible(true)} style={styles.salvarTudo}>
                        <Image style={styles.lixo} source={require('../assets/adicionar.png')} />
                        <Text style={styles.apagarTudoTexto}>Salvar lista</Text>
                    </TouchableOpacity>

                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalListaSalva}
                    onRequestClose={() => setModalListaSalva(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Lista Salva!</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setModalListaSalva(false);
                                    navigation.navigate('ListaSalva', { listasSalvas: listasSalvas });
                                }}
                            >
                                <Text style={styles.modalButtonText}>Acessar Lista!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSalvarVisible}
                    onRequestClose={() => setModalSalvarVisible(false)}
                >
                    <View style={styles.modalContainerSalvar}>
                        <View style={styles.modalContentSalvar}>
                            <TextInput
                                style={styles.nomeInputSalvar}
                                placeholder="Digite o nome da lista"
                                value={nomeDaLista}
                                onChangeText={setNomeDaLista}
                            />
                            <Text style={styles.tituloModalSalvar}>Escolha a categoria para salvar a lista:</Text>
                            <ScrollView style={styles.categoriaScrollViewSalvar}
                                showsHorizontalScrollIndicator={true}
                                persistentScrollbar={true}>
                                {['Variados', 'Hortifruti', 'Adega', 'Padaria', 'Açougue', 'Mercearia', 'Frios', 'Outros'].map((categoria) => (
                                    <TouchableOpacity
                                        key={categoria}
                                        style={[
                                            styles.categoriaBotaoSalvar,
                                            categoriaParaSalvar === categoria && { backgroundColor: '#7DBF4E' }
                                        ]}
                                        onPress={() => setCategoriaParaSalvar(categoria)}
                                    >
                                        <Text style={[
                                            styles.categoriaTextoSalvar,
                                            categoriaParaSalvar === categoria && { color: 'white' }]}>{categoria}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <View style={styles.botoesContainerSalvar}>
                                <TouchableOpacity
                                    style={[styles.botaoSalvar, { marginRight: 5 }]}
                                    onPress={salvarLista}
                                >
                                    <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.botaoSalvar, styles.cancelarBotaoSalvar]}
                                    onPress={() => setModalSalvarVisible(false)}
                                >
                                    <Text style={styles.textoBotaoSalvar}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalNenhumProdutoVisible}
                    onRequestClose={() => setModalNenhumProdutoVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Nenhum produto adicionado na categoria selecionada.</Text>
                            <TouchableOpacity
                                onPress={() => setModalNenhumProdutoVisible(false)}
                                style={styles.modalButton}
                            >
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainerLimpar}>
                        <View style={styles.modalContentLimpar}>
                            <Text style={styles.modalTitleLimpar}>Selecione as categorias a serem limpas:</Text>
                            <ScrollView
                                style={styles.categoriaScrollViewLimpar}
                                showsHorizontalScrollIndicator={true}
                                persistentScrollbar={true}
                            >
                                {['Variados', 'Hortifruti', 'Adega', 'Padaria', 'Açougue', 'Mercearia', 'Frios', 'Outros'].map((categoria) => (
                                    <TouchableOpacity
                                        key={categoria}
                                        style={[
                                            styles.categoriaButtonLimpar,
                                            categoriasSelecionadas.includes(categoria) && { backgroundColor: '#7DBF4E' }
                                        ]}
                                        onPress={() => toggleCategoriaSelecionada(categoria)}
                                    >
                                        <Text
                                            style={[
                                                styles.categoriaButtonTextLimpar,
                                                categoriasSelecionadas.includes(categoria) && { color: '#fff' }
                                            ]}
                                        >
                                            {categoria}
                                        </Text>

                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <View style={styles.botoesContainerSalvar}>
                                <TouchableOpacity
                                    style={styles.modalButtonLimpar}
                                    onPress={() => {
                                        limparCategoriasSelecionadas();
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalButtonTextLimpar}>Limpar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.modalButtonLimpar, styles.cancelButtonLimpar]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonTextLimpar}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalAdicionarCardVisible}
                    onRequestClose={() => setModalAdicionarCardVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Adicione um card antes de limpar!</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setModalAdicionarCardVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.containerValorTotal}>
                    <View style={styles.valorTotal}>
                        <View style={styles.resultado}>
                            <Image
                                style={styles.dinheiro}
                                source={require('../assets/dinheiro.png')}
                            />
                            <Text style={styles.valorTotalTexto}>R$</Text>
                        </View>
                        <Text style={[styles.valorTotalPreco, { color: limiteUltrapassado ? 'orange' : 'white' }]}>
                            {totalPreco.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {limiteUltrapassado && (
                        <Animatable.View
                            animation="slideInUp"
                            duration={500}
                            style={styles.mensagemFinal}
                        >
                            <Text style={styles.avisoLimite}>
                                Cuidado!
                            </Text>
                            <Text style={styles.fimTexto}>
                                <Text style={styles.valorTotalLimite}>Valor total</Text> dos produtos excede <Text style={styles.diferencaTotal}>R$ {(totalPreco - valorLimite).toFixed(2)}</Text> o <Text style={styles.limiteEspecificado}>limite especificado.</Text>
                            </Text>
                        </Animatable.View>
                    )}
                </View>



            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',

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
        width: 30,
        height: 30
    },
    bemVindo: {
        paddingTop: 20,
        color: 'rgba(0, 0, 0, 0.62)',
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 26
    },
    logo: {
        width: 155,
        height: 35
    },
    dinheiro: {
        width: 43,
        height: 43,
        marginRight: 15
    },
    input: {
        width: 248,
        height: 43,
        paddingLeft: 20,
        padding: 10, // Reduzido o padding para 10
        borderWidth: 0.70,
        borderColor: "#B8C8B7",
        borderRadius: 25,
        color: "#000",
        fontFamily: "Inter",
        alignItems: 'flex-start',
        backgroundColor: "#FFF"
    },
    precoMax: {
        flexDirection: "row",
        paddingEnd: 40,
        paddingStart: 40,
        padding: 30,
        alignItems: "center"

    },
    mercados: {
        paddingTop: 15,
        paddingEnd: 40,
        paddingStart: 40,
    },
    mercadosTitulo: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "900",
        color: "#0B8C38",
        paddingBottom: 15
    },
    opcoesMercado: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    adicionarMercado: {
        marginRight: 13,
        width: 130,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarMercadoTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarHortifruti: {
        marginRight: 15,
        width: 134,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarHortifrutiTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarAdega: {
        marginRight: 13,
        width: 113,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarAdegaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarPadaria: {
        marginRight: 13,
        width: 120,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarPadariaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarAcougue: {
        marginRight: 13,
        width: 120,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarAcougueTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarMercearia: {
        marginRight: 13,
        width: 130,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarMerceariaTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarFrios: {
        marginRight: 13,
        width: 92,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarFriosTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarOutros: {
        marginRight: 13,
        width: 106,
        height: 33,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.44)'
    },
    adicionarOutrosTexto: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 17.3,
        color: 'rgba(0, 0, 0, 0.62)'
    },
    adicionarIcon: {
        width: 32,
        height: 32,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 40,
        alignItems: "center"
    },
    imgCardAdicionar: {
        width: 135,
        height: 135,
        alignSelf: "flex-end",
        marginTop: 15
    },
    imgCardAdicionado: {
        width: 115,
        height: 115,
        alignSelf: "flex-end",
        marginTop: 15
    },
    card: {
        marginRight: 53,
        paddingTop: 10,
        backgroundColor: "#0B8C38",
        height: 325,
        width: 230,
        borderRadius: 22,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.6, // Opacidade da sombra (entre 0 e 1)
        shadowRadius: 10, // Raio da sombra
        elevation: 10,
    },
    cardAdicionado: {
        marginRight: 53,
        paddingTop: 10,
        backgroundColor: "#0B8C38",
        height: 325,
        width: 230,
        borderRadius: 22,
        shadowColor: '#000', // Cor da sombra
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.6, // Opacidade da sombra (entre 0 e 1)
        shadowRadius: 10, // Raio da sombra
        elevation: 10,
    },
    botaoMais: {
        marginEnd: '8%'
    },
    maisProduto: {
        width: 60,
        height: 60,
        alignSelf: "flex-end",

    },
    tituloAdicionar: {
        fontFamily: "Inter",
        fontWeight: "800",
        fontSize: 27,
        color: "#F7AB38",
        width: 129.8,
        marginStart: "12%"
    },
    tituloAdicionarSpan: {
        fontFamily: "Inter",
        marginStart: "9%",
        fontWeight: "800",
        fontSize: 27,
        color: "#FFf"
    },
    valores: {
        paddingTop: 7,
        flexDirection: "row",
        marginStart: "12%",
        alignItems: "center",
    },
    quantidade: {
        paddingStart: 15,
        paddingEnd: 15,
        fontFamily: "Inter",
        fontWeight: "800",
        color: "white",
        fontSize: 19
    },
    botaoMaisProduto: {
        width: 36,
        height: 22
    },
    botaoMenosProduto: {
        width: 37,
        height: 22
    },
    valorProduto: {
        paddingStart: "12%",
        paddingTop: 10,
        fontFamily: "Inter",
        fontWeight: '900',
        fontSize: 23,
        color: "white"
    },
    limparContainer: {
        paddingStart: "6%",
        paddingEnd: "6%",
        flexDirection: 'row',
        justifyContent: "space-evenly"

    },
    salvarTudo: {
        backgroundColor: '#fff',
        flexDirection: "row",
        borderWidth: 1.3,
        borderColor: 'rgba(00, 00, 00, 0.44)',
        padding: 7,
        width: 143,
        justifyContent: "space-around",
        borderRadius: 25,
        alignItems: "center"
    },
    apagarTudo: {
        backgroundColor: '#fff',
        flexDirection: "row",
        borderWidth: 1.3,
        borderColor: 'rgba(00, 00, 00, 0.44)',
        padding: 7,
        width: 130,
        justifyContent: "space-around",
        borderRadius: 25,
        alignItems: "center"
    },
    apagarTudoTexto: {
        fontFamily: "Inter",
        fontSize: 17.3,
        fontWeight: "800",
        color: 'rgba(22, 85, 21, 0.85)'
    },
    lixo: {
        width: 22,
        height: 22
    },
    containerValorTotal: {
        paddingStart: 40,
        paddingEnd: 40,
    },
    valorTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingEnd: "8%",
        paddingStart: "8%",
        height: 60,
        backgroundColor: "#0B8C38",
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 50
    },
    resultado: {
        flexDirection: "row",
        alignItems: "center"
    },
    valorTotalTexto: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "800",
        color: "white",
    },
    valorTotalPreco: {
        fontFamily: "Inter",
        fontSize: 25,
        fontWeight: "800",
        color: "white",
    },
    modalContainerSalvar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentSalvar: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    nomeInputSalvar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: 15,
    },
    tituloModalSalvar: {
        fontSize: 19,
        marginBottom: 10,
        fontFamily: 'Inter',
        fontWeight: '800',
        color: "#0B8C38"
    },
    categoriaScrollViewSalvar: {
        maxHeight: 150,
        width: '100%',
        marginBottom: 20,
    },
    categoriaBotaoSalvar: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
    },
    categoriaTextoSalvar: {
        fontSize: 17,
        fontFamily: 'Inter',
        fontWeight: '700',
        color: "rgba(0, 0, 0, 0.72)"
    },
    botoesContainerSalvar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    botaoSalvar: {
        backgroundColor: '#7DBF4E',
        padding: 10,
        borderRadius: 20,
        flex: 1,
        alignItems: 'center',
    },
    cancelarBotaoSalvar: {
        backgroundColor: 'rgba(255, 93, 0, 0.80)',
    },
    textoBotaoSalvar: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter',
        fontWeight: '600'
    },
    modalContainerLimpar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentLimpar: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitleLimpar: {
        color: "#0B8C38",
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoriaButtonLimpar: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 5,
        width: '100%',
        alignItems: 'center',
    },
    categoriaButtonTextLimpar: {
        fontSize: 17,
        fontFamily: 'Inter',
        fontWeight: '700',
        color: "rgba(0, 0, 0, 0.72)"
    },
    modalButtonLimpar: {
        backgroundColor: '#7DBF4E',
        padding: 10,
        borderRadius: 18,
        flex: 1,
        alignItems: 'center',

    },
    modalButtonTextLimpar: {
        color: '#fff',
        fontSize: 15
    },
    cancelButtonLimpar: {
        backgroundColor: 'rgba(255, 93, 0, 0.80)',
        marginLeft: '3%'
    },
    categoriaScrollViewLimpar: {
        maxHeight: 150,
        width: '100%',
        marginBottom: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'color: "rgba(0, 0, 0, 0.72)'
    },
    modalButton: {
        backgroundColor: '#7DBF4E',
        padding: 15,
        borderRadius: 17,
        alignItems: 'center',
        width: '100%',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    mensagemFinal: {
        backgroundColor: "#0B8C38",
        padding: 10,
        borderRadius: 15,
        marginStart: 40,
        marginEnd: 40,
        marginBottom: 25,
        elevation: 3,
        paddingStart: 23,
        paddingTop: 23,
        paddingBottom: 25
    },
    avisoLimite: {
        color: 'white',
        fontWeight: '500',
        fontSize: 22,
        width: '100%'
    },
    valorTotalLimite: {
        borderRadius: 4,
        padding: 5,
        color: '#ffc107',
        fontFamily: 'Inter',
        fontWeight: '800',
        fontSize: 20,

    },
    limiteEspecificado: {
        color: 'white',
        fontWeight: 'bold',
    },
    diferencaTotal: {
        marginTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    fimTexto: {
        fontFamily: 'Inter',
        color: 'white',
        fontSize: 18
    }

});
