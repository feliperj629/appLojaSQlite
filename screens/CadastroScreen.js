import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');


    const enviarDados = () => {
        if (!nome || !email) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        alert(nome + ' ' + email);
        //Navega para a tela de dados com os dados do formulário.
        navigation.navigate('ListaDados', { nome, email });

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
            <Button title="Enviar" onPress={enviarDados} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    label: { fontSize: 18, marginBottom: 5 },
    input: {
        borderWidth: 1, borderColor: '#ccc',
        padding: 10, marginBottom: 20, borderRadius: 5
    }
});