# Documentação
## Arquitetura
```
|- assets/
  |- logo.png
|- src/
  |- config/
    |- firebaseConfig.js
  |- contexts/
    |- AuthContext.js
    |- CartoesEstudoContext.js
  |- screens/
    |- EdicaoCartaoScreen.js
    |- ListaCartaoScreen.js
    |- LoginScreen.js
    |- RegistroScreen.js
    |- TarefasVencimentoProximoScreen.js
|- .env
|- .gitignore
|- App.js
|- app.json
|- babel.config.json
|- index.js
|- package-lock.json
|- package.json
```

- Pasta assets: Contém imagens, fontes, ícones ou outros recursos usados pela aplicação.
- Pasta src: Contém todo o código-fonte principal da aplicação.
- Pasta config: Contém as configurações e integrações externas da aplicação.
- Pasta contexts: Contém os métodos que fazem a organização e os contextos para gerenciamento de estado global. Operações com os dados do BD.
- Pasta screens: Contém as views/telas da aplicação que o usuário vai ver.



## Arquivos
- .env: Armazena variáveis de ambiente, como chaves de API ou URLs.
- .gitignore: Define arquivos e pastas que o Git deve ignorar.
- App.js: Arquivo principal que inicializa a aplicação. Serve como ponto de entrada para a estrutura do aplicativo.
- app.json: Arquivo de configuração que define informações da aplicação.
- babel.config.json: Configurações do Babel.
- index.js: Ponto de entrada inicial da aplicação, onde o React Native começa a executar o código.
- package.json e package-lock.json: Arquivos que contêm informações sobre dependências do projeto e versões exatas.



## Detalhamento dos arquivos
- ### firebaseConfig.js
  - Aqui estão importados as variáveis do .env, em seguida estão sendo armazenadas na variável "firebaseConfig" para serem usadas na conexão entre o app e o BD Firebase. A função `getApps()` retorna uma lista de todas as instâncias de aplicativos Firebase já inicializadas. 
  - Caso não exista nenhuma instância, a função `initializeApp()` será chamada, ela é usada para inicializar o Firebase em um aplicativo com as configurações fornecidas.
  
  ![image](https://github.com/user-attachments/assets/f9ff609a-2039-459f-b307-9e182b2e78db)


- ### AuthContext.js
  - Este arquivo serve como um "canal" para compartilhar dados de autenticação globalmente.
  - O Firebase notifica automaticamente sobre alterações no estado de autenticação do usuário usando `onAuthStateChanged()`.
  - A função `logou()` chama `signOut(auth)` para desconectar o usuário no Firebase.
  - Por fim o `AuthContext.Provider` é o componente que compartilha os dados e funções do contexto (value) com todos os seus descendentes.

  ![image](https://github.com/user-attachments/assets/13bd47f4-c0d4-4ee9-bfda-71a8ad7ba281)


- ### CartoesEstudoContext.js
  - Arquivo responsável pelo fluxo de dados dos cartões. Quando o component `ProvedorCartoesEstudo` é chamado, ele chama instantaneamente a função `carregarCartoes()`, somente se o user estiver logado.
  - `carregarCartoes()` busca uma listagem dos cartões do usuário.
  - `adicionarCartao()` cadastra um cartão do usuário.
  - `atualizarCartao()` atualiza os dados de um cartão do usuário.
  - `excluirCartao()` exclui um cartão do usuário.
  - O `CartoesEstudoContext.Provider` é responsável por fornecer os dados e funções para os componentes que forem consumidores do contexto.
  - Funcionalidades importantes usadas para concluir o fluxo:
    - `query()`: Cria uma consulta personalizada para a coleção.
    - `collection()`: Funciona como uma "tabela" que contém todos os dados relacionados a cartões.
    - `addDoc()`: Adiciona um objeto, neste caso "novoCartao", na coleção "cartões".
    - `updateDoc()`: Atualiza os campos de um dado existente no banco de dados.
    - `deleteDoc()`: Remove os campos de um dado existente no banco de dados.
      
    ![image](https://github.com/user-attachments/assets/e9069418-f047-4832-a7b6-e106cd0abe22)
    ![image](https://github.com/user-attachments/assets/63177e26-d5f3-4d65-bbc3-51f07d3597d6)
    ![image](https://github.com/user-attachments/assets/7a512f0b-c264-492a-a45a-5839c05932d9)
    ![image](https://github.com/user-attachments/assets/fe018e1a-3f17-434a-8a2e-0380a06f7bbd)


- ### EdicaoCartaoScreen.js
  - Neste arquivo ocorre a alteração de dados de um cartão. Ao entrar na página, todos os dados atuais do cartão são preenchidos em seus devidos campos na chamda do `useEffect()`.
  - O id do cartão é extraído de um parâmetro da url através do `route.params`.
  - Importa as funções `cartoes, adicionarCartao, atualizarCartao` do contexto `CartoesEstudoContext` para obter os dados necessários.
  - A função `salvar()` pega os dados do cartão modificados pelo usuário e atualiza o cartão, ou cria um novo caso não foi encontrado cartão com tal id.
  
  ![image](https://github.com/user-attachments/assets/3840ce19-9132-4c63-9810-fc8188af4cca)


- ### ListaCartaoScreen.js
  - Tela responsável pela listagem de cartões do usuário. Também fornecendo funcionalidades para excluir, editar e adicionar novos cartões.
  - Os cartões são divididos em três categorias, filtrando por status: "backlog", "em progresso" e "concluídos". Para cada status, a tela renderiza uma lista de cartões com um estilo específico.
    - O componente `FlatList` busca os cartões a partir da variável `cartoesAgrupadosPorStatus` e renderiza os cartões com a função `renderizarCartao()`.
  - Para cada cartão há um botão "Editar", que te encaminha através da url "EdicaoCartao/{id}", e "Excluir" que chama a função `confirmarExclusao()` que abre um alerta para confirmar a exclusão.
  - Também há um botão para adicionar novos cartões, que ao clicar o user é encaminha para a url "EdicaoCartao", porpem desta vez sem o id do cartão no final.
  - Também busca o número de cartões que vão vencer nos próximos 15 dias.
  
  ![image](https://github.com/user-attachments/assets/6b8ff9dc-ae11-43fe-a348-97a306eb5af6)
  ![image](https://github.com/user-attachments/assets/ed0838b7-fc23-4fe2-8eea-95d8c13407b5)

 
- ### LoginScreen.js
  - Tela responsável pelo login do usuário.
  - Ao clicar no botão de login, a função `handleLogin()` é chamada, onde é obtido os valores dos inputs de email e password e usados na função `signInWithEmailAndPassword()`, importada do Firebase, para fazer o login do usuário.
  - Também há um botão para encaminhar o usuário para a tela de registro.
  
  ![image](https://github.com/user-attachments/assets/e4213744-c529-4aff-a734-3e58f154f69d)


- ### RegistroScreen.js
  - Tela responsável pelo registro de um usuário.
  - Ao clicar no botão de registrar, a função `handleRegister()` é chamada, onde é obtido os valores dos inputs de email e password e usados na função `createUserWithEmailAndPassword()`, importada do Firebase, para fazer o registro do usuário.
  
  ![image](https://github.com/user-attachments/assets/9e449706-9d35-4cff-90da-9685c52d1a4c)


- ### TarefasVencimentoProximoScreen.js
  - A tela exibe uma lista de cartões que vão vencer dentro dos próximos 15 dias.
  - A função `cartoesVencimentoProximo()` procura em todos os cartões do usuário, quais vão vencer em 15 dias.
  - O componente `FlatList` pega a variavel com os cartões que vão vencer (`cartoesVencimentoProximo`), e renderiza os cartões com a função `renderizarCartao()`.
  
  ![image](https://github.com/user-attachments/assets/eae71f9e-540f-4fea-bf38-48356e139050)


- ### App.js
  - Essa é a primeira tela da aplicação, responsável por verificar qual tela vai trazer quando o usuário entrar.
  - O é responsável por gerenciar a navegação entre as telas de forma empilhada. As telas são empilhadas uma sobre a outra, com a tela de login aparecendo primeiro quando o usuário não está autenticado e a tela principal de listagem de cartão quando o usuário está autenticado.
    - Caso o usuário estiver logado, ele terá acessado às rotas protegias: ListaCartao, EdicaoCartao, TarefasVencimentoProximo
    - Se não estiver logado, terá acesso somente as rotas públicas: Login, Registro
  ![image](https://github.com/user-attachments/assets/2ccbf5d5-1f21-4253-8b1b-9be3a9bca4c9)
  ![image](https://github.com/user-attachments/assets/e1784ee9-781f-4fff-bf80-6abd4f69a070)




