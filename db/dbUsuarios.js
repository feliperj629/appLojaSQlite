// db/database.js
import * as SQLite from 'expo-sqlite';

// Variável global para armazenar a instância do banco de dados
let db;

// Função para inicializar o banco de dados
export async function initDB() {
    try {
        if (!db) {
            // console.log('Inicializando banco de dados...');
            db = await SQLite.openDatabaseAsync('meubanco.db');

            // Criação da tabela
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome TEXT NOT NULL,
                    email TEXT NOT NULL
                );
            `);

            // Verifica se já existem dados na tabela
            const result = await db.getAllAsync('SELECT COUNT(*) as count FROM usuarios;');

            if (result[0].count === 0) {
                // Insere dados iniciais apenas se a tabela estiver vazia
                await db.execAsync(`
                    INSERT INTO usuarios (nome, email) VALUES ('João', 'joao@gmail.com');
                    INSERT INTO usuarios (nome, email) VALUES ('Maria', 'maria@gmail.com');
                    INSERT INTO usuarios (nome, email) VALUES ('Pedro', 'pedro@gmail.com');
                `);
            }

            // console.log('Banco de dados inicializado com sucesso');
        }
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
        throw error;
    }
}

// Função para inserir um novo usuário na tabela
export async function inserirUsuario(nome, email) {
    try {
        if (!db) {
            await initDB();
        }
        // Verifica se já existem dados na tabela
        const verificar = await db.getAllAsync('SELECT COUNT(*) as count FROM usuarios WHERE nome = ? AND email = ?;', [nome, email]);

        if (verificar[0].count > 0) {
            alert('Usuário já existe!');
            // console.log('Usuário já existe!');
            return;
        } else {
            const result = await db.runAsync(
                'INSERT INTO usuarios (nome, email) VALUES (?, ?);',
                [nome, email]
            );
            // console.log('Usuário inserido com sucesso:', result);
            return result;
        }
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
        throw error;
    }
}

// Função para listar todos os usuários da tabela
export async function listarUsuarios() {
    try {
        if (!db) {
            await initDB();
        }
        const result = await db.getAllAsync('SELECT * FROM usuarios;');
        // console.log('Usuários listados:', result);
        return result;
    } catch (error) {
        console.error('Erro ao listar usuarios:', error);
        throw error;
    }
}
