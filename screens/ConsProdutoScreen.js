import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, RefreshControl, Alert, Image } from 'react-native';
import { listarProdutos, removerProduto, atualizarProduto } from '../db/dbProdutos';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { obterUriImagem } from '../utils/imageUploader';


// Função para criar um delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export default function ConsProdutoScreen({ route }) {
    const [produtos, setProdutos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Função para carregar os produtos
    const carregarProdutos = async () => {
        try {
            setLoading(true);
            // Adiciona um delay de 2 segundos
            // await delay(2000);
            const listaProdutos = await listarProdutos();
            setProdutos(listaProdutos);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Atualiza a lista quando a tela recebe foco
    useFocusEffect(
        // Função para carregar os produtos
        React.useCallback(() => {
            carregarProdutos();
        }, [])
    );

    // Função para atualizar a lista de produtos
    const onRefresh = async () => {
        setRefreshing(true);
        await carregarProdutos();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => {
        // console.log(item);
        const formatador = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
        const valorFormatado = formatador.format(item.preco);
        // console.log(valorFormatado);

        return (
            <View style={styles.itemContainer}>
                <View style={styles.row}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.preco}>{valorFormatado}</Text>

                    {item.imagem && (
                        <Image
                            source={{ uri: obterUriImagem(item.imagem) }}
                            style={styles.imagem}
                        />
                    )}

                    <View style={styles.action}>
                        <Button title="Editar" onPress={() => navigation.navigate('Cadastrar Produto', { id: item.id })} />
                        <Button
                            title="Remover"
                            color="red"
                            onPress={() => Alert.alert('Remover Produto', 'Tem certeza que deseja remover este produto?', [
                                { text: 'Cancelar', style: 'cancelar' },
                                {
                                    text: 'Remover', onPress: () => {
                                        removerProduto(item.id);
                                        carregarProdutos();
                                    }
                                }
                            ])}
                        />
                    </View>
                </View>

            </View>
        );
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando produtos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Produtos</Text>
            <Button title="Cadastrar Produto" onPress={() => navigation.navigate('Cadastrar Produto')} />
            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
    retryButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    preco: {
        fontSize: 16,
        color: '#666'
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 5
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 50,
        alignSelf: 'flex-end'
    },
    cancelar: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 50,
        alignSelf: 'flex-end'
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: '#ccc'
    }
});