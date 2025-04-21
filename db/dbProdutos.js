// db/database.js
import * as SQLite from 'expo-sqlite';

// Variável global para armazenar a instância do banco de dados
let db;

// Função para formatar o preço
const formatarPreco = (valor) => {
    // Se já for número, retorna direto
    if (typeof valor === 'number') return valor;

    // Remove todos os caracteres não numéricos exceto ponto e vírgula
    let valorLimpo = String(valor).replace(/[^\d,.]/g, '');

    // Substitui vírgula por ponto
    valorLimpo = valorLimpo.replace(',', '.');

    // Remove pontos extras, mantendo apenas o último
    const partes = valorLimpo.split('.');
    if (partes.length > 2) {
        valorLimpo = partes[0] + '.' + partes.slice(1).join('');
    }

    // Converte para número
    const numero = parseFloat(valorLimpo);

    // Verifica se é um número válido
    if (isNaN(numero)) {
        throw new Error('Preço inválido');
    }

    return numero;
};

// Função para inicializar o banco de dados
export async function initDBProdutos() {
    try {
        if (!db) {
            // console.log('Inicializando banco de dados...');
            db = await SQLite.openDatabaseAsync('meubanco.db');

            // Criação da tabela
            //  Incluir caso precise apagar a tabela:
            //      DROP TABLE IF EXISTS produtos;
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS produtos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    preco REAL NOT NULL,
                    imagem TEXT
                );
            `);

            // Verifica se já existem dados na tabela
            const result = await db.getAllAsync('SELECT COUNT(*) as count FROM produtos;');

            if (result[0].count === 0) {
                // Insere dados iniciais apenas se a tabela estiver vazia
                await db.execAsync(`
                    INSERT INTO produtos (nome, preco, imagem) VALUES ('Camisa Regata', 30.00, NULL);
                    INSERT INTO produtos (nome, preco, imagem) VALUES ('Camisa Social', 60.00, NULL);
                    INSERT INTO produtos (nome, preco, imagem) VALUES ('Camisa Gola V', 40.00, NULL);
                `);
            }

            // console.log('Banco de dados inicializado com sucesso');
        }
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
        throw error;
    }
}

// Função para inserir um novo produto na tabela
export async function inserirProduto(nome, preco, imagem = null) {
    try {
        if (!db) {
            await initDBProdutos();
        }

        // Formata o preço
        const precoFormatado = formatarPreco(preco);

        // Verifica se já existem dados na tabela
        const verificar = await db.getAllAsync(
            'SELECT COUNT(*) as count FROM produtos WHERE nome = ? AND preco = ?;',
            [nome, precoFormatado]
        );

        if (verificar[0].count > 0) {
            throw new Error('Produto já existe!');
        }

        const result = await db.runAsync(
            'INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?);',
            [nome, precoFormatado, imagem]
        );

        // console.log('Produto inserido com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao inserir produto:', error);
        throw error;
    }
}

// Função para listar todos os produtos da tabela
export async function listarProdutos() {
    try {
        if (!db) {
            await initDBProdutos();
        }
        const result = await db.getAllAsync('SELECT * FROM produtos;');
        // console.log('Produtos listados:', result);
        return result;
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        throw error;
    }
}

// Função para remover um produto da tabela
export async function removerProduto(id) {
    try {
        if (!db) {
            await initDBProdutos();
        }
        const result = await db.runAsync('DELETE FROM produtos WHERE id = ?;', [id]);
        // console.log('Produto removido com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao remover produto:', error);
        throw error;
    }
}

// Função para atualizar um produto existente
export async function atualizarProduto(id, nome, preco, imagem = null) {
    try {
        if (!db) {
            await initDBProdutos();
        }
        const precoFormatado = formatarPreco(preco);
        const result = await db.runAsync(
            'UPDATE produtos SET nome = ?, preco = ?, imagem = ? WHERE id = ?;',
            [nome, precoFormatado, imagem, id]
        );

        // console.log('Produto atualizado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
}

// Função para buscar um produto pelo ID
export async function buscarProduto(id) {
    try {
        if (!db) {
            await initDBProdutos();
        }
        const result = await db.getAllAsync('SELECT * FROM produtos WHERE id = ?;', [id]);
        // console.log('Produto encontrado:', result);
        if (result && result.length > 0) {
            return result[0];
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        throw error;
    }
}