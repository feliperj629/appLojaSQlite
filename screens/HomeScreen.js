import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Página Inicial</Text>
            <Button title="Abrir Menu" onPress={() => navigation.openDrawer()} />
        </View>
    );
}
