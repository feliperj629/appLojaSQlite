# Tutorial: Implementando a Função de Exclusão de Registros

Este tutorial explica os passos necessários para implementar a funcionalidade de exclusão de registros em um aplicativo React Native com SQLite.

## 1. Adicionar a Função de Exclusão no Banco de Dados

No arquivo `db/database.js`, adicione a função `excluirUsuario`:

```javascript
export async function excluirUsuario(id) {
    try {
        if (!db) await initDB();

        const result = await db.runAsync(
            'DELETE FROM usuarios WHERE id = ?;',
            [id]
        );
        return result;
    } catch (error) {
        console.error('Erro ao excluir usuario:', error);
        throw error;
    }
}
```

## 2. Modificar a Tela de Consulta

No arquivo `screens/ConsultaScreen.js`, faça as seguintes alterações:

### 2.1 Importar os Componentes Necessários
```javascript
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import { listarUsuarios, excluirUsuario } from '../db/database';
```

### 2.2 Adicionar a Função de Manipulação da Exclusão
```javascript
const excluirUsuarioHandler = async (id) => {
    Alert.alert(
        'Confirmar exclusão',
        'Tem certeza que deseja excluir este usuário?',
        [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Excluir',
                onPress: async () => {
                    try {
                        await excluirUsuario(id);
                        await carregarUsuarios();
                        Alert.alert('Sucesso', 'Usuário excluído com sucesso!');
                    } catch (error) {
                        Alert.alert('Erro', 'Erro ao excluir usuário: ' + error.message);
                    }
                },
                style: 'destructive'
            }
        ]
    );
};
```

### 2.3 Modificar o Componente de Renderização do Item
```javascript
const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </View>
        <Button
            title="Excluir"
            onPress={() => excluirUsuarioHandler(item.id)}
            color="red"
        />
    </View>
);
```

### 2.4 Atualizar os Estilos
```javascript
const styles = StyleSheet.create({
    // ... outros estilos ...
    itemContainer: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemContent: {
        flex: 1
    }
});
```

## 3. Funcionalidades Implementadas

1. **Botão de Exclusão**: Um botão vermelho ao lado de cada usuário
2. **Confirmação**: Diálogo de confirmação antes da exclusão
3. **Feedback**: Mensagens de sucesso ou erro após a operação
4. **Atualização Automática**: A lista é atualizada automaticamente após a exclusão

## 4. Boas Práticas Implementadas

1. **Confirmação do Usuário**: Evita exclusões acidentais
2. **Tratamento de Erros**: Mensagens claras em caso de falha
3. **Feedback Visual**: Cores e estilos apropriados para ações destrutivas
4. **Atualização da Interface**: Lista atualizada automaticamente após a exclusão

## 5. Testando a Funcionalidade

1. Clique no botão "Excluir" ao lado de um usuário
2. Confirme a exclusão no diálogo
3. Verifique se o usuário foi removido da lista
4. Verifique se a mensagem de sucesso foi exibida

## 6. Observações

- A função de exclusão é permanente e não pode ser desfeita
- É importante ter certeza antes de excluir um registro
- O botão vermelho indica uma ação destrutiva
- A confirmação ajuda a prevenir exclusões acidentais
- O componente Alert é necessário para exibir as mensagens de confirmação e feedback