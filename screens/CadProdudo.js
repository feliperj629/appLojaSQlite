import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { inserirProduto, buscarProduto, atualizarProduto } from '../db/dbProdutos';
import * as ImagePicker from 'expo-image-picker'; //npm install expo-image-picker
import { fazerUploadImagem, obterUriImagem } from '../utils/imageUploader';

export default function CadastroScreen({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);
    const [caminhoImagem, setCaminhoImagem] = useState(null);
    const [produtoId, setProdutoId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (route.params?.id) {
            carregarProduto(route.params.id);
        }
    }, [route.params?.id]);

    const carregarProduto = async (id) => {
        try {
            setLoading(true);
            const produto = await buscarProduto(id);
            console.log('Produto carregado:', produto);

            if (produto) {
                setProdutoId(id);
                setNome(produto.nome);
                setValor(produto.preco.toString());
                if (produto.imagem) {
                    setImagem(obterUriImagem(produto.imagem));
                    setCaminhoImagem(produto.imagem);
                } else {
                    setImagem(null);
                    setCaminhoImagem(null);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar produto:', error);
            Alert.alert('Erro', error.message || 'Não foi possível carregar o produto');
        } finally {
            setLoading(false);
        }
    };

    const enviarDados = async () => {
        if (!nome || !valor) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            if (produtoId) {
                // Atualizar produto existente
                await atualizarProduto(produtoId, nome, valor, caminhoImagem);
                alert('Produto atualizado com sucesso!');
            } else {
                // Inserir novo produto
                await inserirProduto(nome, valor, caminhoImagem);
                alert('Produto cadastrado com sucesso!');
            }
            navigation.navigate('Consultar Produto');
        } catch (error) {
            alert('Erro ao salvar produto: ' + error.message);
        }
    };

    const selecionarImagem = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                const uri = result.assets[0].uri;
                setImagem(uri);

                // Faz upload da imagem e salva o caminho
                const caminho = await fazerUploadImagem(uri);
                setCaminhoImagem(caminho);
            }
        } catch (error) {
            console.error('Erro ao selecionar imagem:', error);
            alert('Erro ao selecionar imagem');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome do produto"
            />
            <Text style={styles.label}>Valor:</Text>
            <TextInput
                style={styles.input}
                value={valor}
                onChangeText={setValor}
                placeholder="Digite o valor do produto"
                keyboardType="numeric"
            />
            <Text style={styles.label}>Imagem:</Text>
            {imagem && (
                <Image
                    source={{ uri: imagem }}
                    style={styles.imagem}
                />
            )}
            <Button
                title="Selecionar Imagem"
                onPress={selecionarImagem}
            />

            <View style={styles.buttonContainer}>
                <Button color="grey" title="Voltar" onPress={() => navigation.goBack()} />
                <Button color="green" title={produtoId ? "Atualizar" : "Enviar"} onPress={enviarDados} style={styles.button} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, justifyContent: 'center' },
    label: { fontSize: 18, marginBottom: 5 },
    input: {
        borderWidth: 1, borderColor: '#ccc',
        padding: 10, marginBottom: 20, borderRadius: 5
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#ccc'
    }
});