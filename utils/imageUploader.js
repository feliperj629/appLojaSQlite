import * as FileSystem from 'expo-file-system'; //npm install expo-file-system
import { Platform } from 'react-native';

// Função para criar o diretório de imagens se não existir
const criarDiretorioImagens = async () => {
    const diretorioImagens = `${FileSystem.documentDirectory}imagens/`;
    const dirInfo = await FileSystem.getInfoAsync(diretorioImagens);

    if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(diretorioImagens, { intermediates: true });
    }

    return diretorioImagens;
};

// Função para fazer upload da imagem
export const fazerUploadImagem = async (uri) => {
    try {
        // Cria o diretório de imagens
        const diretorioImagens = await criarDiretorioImagens();

        // Gera um nome único para a imagem
        const nomeArquivo = `imagem_${Date.now()}.jpg`;
        const caminhoDestino = `${diretorioImagens}${nomeArquivo}`;

        // Copia a imagem para o diretório de imagens
        await FileSystem.copyAsync({
            from: uri,
            to: caminhoDestino
        });

        // Retorna o caminho relativo da imagem
        return caminhoDestino;
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
        throw error;
    }
};

// Função para obter a URI da imagem
export const obterUriImagem = (caminho) => {
    if (Platform.OS === 'android') {
        return `file://${caminho}`;
    }
    return caminho;
}; 