import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator, RefreshControl } from 'react-native';
import { listarUsuarios } from '../db/dbUsuarios';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function ConsUserScreen({ route }) {
    const [usuarios, setUsuarios] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Função para carregar os usuários
    const carregarUsuarios = async () => {
        try {
            setLoading(true);
            const listaUsuarios = await listarUsuarios();
            setUsuarios(listaUsuarios);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        } finally {
            setLoading(false);
        }
    };

    // Atualiza a lista quando a tela recebe foco
    useFocusEffect(
        // Função para carregar os usuários
        React.useCallback(() => {
            carregarUsuarios();
        }, [])
    );

    // Função para atualizar a lista de usuários
    const onRefresh = async () => {
        setRefreshing(true);
        await carregarUsuarios();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </View>
    );

    if (loading && !refreshing) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Carregando usuários...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Lista de Usuários</Text>

            <Button title="Cadastrar Usuario" onPress={() => navigation.navigate('Cadastrar Usuario')} />

            <FlatList
                data={usuarios}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
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
    email: {
        fontSize: 16,
        color: '#666'
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20
    }
});