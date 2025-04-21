import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { inserirUsuario } from '../db/dbUsuarios';

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const enviarDados = async () => {
        if (!nome || !email) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        try {
            const result = await inserirUsuario(nome, email);
            if (result) {
                alert('Usuário cadastrado com sucesso!');
                navigation.navigate('Consultar Usuario', { nome, email });
            }
        } catch (error) {
            alert('Erro ao cadastrar usuário: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>


            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                keyboardType="email-address"
            />
            {/* Colocar botão voltar ao lado do botão enviar */}
            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
                <Button title="Enviar" onPress={enviarDados} style={styles.button} />
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
    }
});