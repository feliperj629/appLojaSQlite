import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataScreen({ route }) {
    const { nome, email } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem-vindo {nome}!</Text>
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>Cadastro realizado com sucesso!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, marginBottom: 10 }
});