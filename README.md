# AppLoja

Um aplicativo de loja desenvolvido em React Native como parte de um projeto de aula.

## 📱 Sobre o Projeto

Este é um aplicativo de loja desenvolvido em React Native que demonstra conceitos fundamentais de desenvolvimento mobile. O projeto foi criado como parte de um exercício de aprendizado.

## 🚀 Tecnologias Utilizadas

- React Native
- Expo
- JavaScript/React
- SQLite (Banco de dados local)

## 📁 Estrutura do Projeto

```
appLoja/
├── assets/          # Arquivos de mídia e recursos
├── screens/         # Telas do aplicativo
│   ├── HomeScreen.js           # Tela inicial
│   ├── CadProdudo.js           # Tela de cadastro de produtos
│   ├── ConsProdutoScreen.js    # Tela de consulta de produtos
│   ├── CadUserScreen.js        # Tela de cadastro de usuários
│   ├── ConsUserScreen.js       # Tela de consulta de usuários
│   └── ProfileScreen.js        # Tela de perfil
├── navigation/      # Configuração de navegação
├── utils/           # Funções utilitárias
│   └── imageUploader.js        # Utilitário para upload de imagens
├── db/              # Configuração do banco de dados
│   ├── dbProdutos.js           # Funções de banco para produtos
│   └── dbUsuarios.js           # Funções de banco para usuários
├── .expo/           # Configurações do Expo
├── node_modules/    # Dependências do projeto
├── App.js           # Componente principal
├── app.json         # Configuração do aplicativo
├── index.js         # Ponto de entrada do aplicativo
├── package.json     # Dependências do projeto
└── package-lock.json # Versões exatas das dependências
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start 
```

ou

```bash
npx expo start
```

## 📱 Executando o Projeto

Para executar o projeto, você pode usar:

```bash
npm start ou npx expo start
```

Isso abrirá o Metro Bundler e você poderá:
- Escanear o QR code com o aplicativo Expo Go
- Pressionar 'a' para abrir no Android
- Pressionar 'i' para abrir no iOS

## 🤝 Contribuição

Este é um projeto de estudo. Contribuições são bem-vindas através de pull requests.

## 📝 Licença

Este projeto está sob a licença MIT.