# Sistema de Gerenciamento de Usuários

## 1. Introdução

Este é um Sistema de Gerenciamento de Usuários full-stack projetado para permitir o cadastro, visualização e exclusão de usuários. O frontend é construído com React e Vite, fornecendo uma interface de usuário dinâmica e responsiva. O backend é desenvolvido com Node.js e Express, interagindo com um banco de dados MySQL para armazenar e gerenciar os dados dos usuários.

Principais funcionalidades:
- Cadastro de usuário com nome, email, CPF, telefone e data de nascimento.
- Exibição dos usuários cadastrados em uma tabela clara e formatada.
- Capacidade de excluir usuários do sistema.
- Formatação de entrada para CPF e números de telefone para melhor experiência do usuário.
- Formatação de data para exibição.

## 2. Tutorial de Instalação

Para colocar este projeto em funcionamento na sua máquina local, siga estes passos:

### Pré-requisitos

- Node.js (que inclui npm ou yarn) instalado no seu sistema.
- Servidor MySQL instalado e em execução.

### Configuração do Backend

1.  **Navegue até o diretório do backend:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando yarn:
    ```bash
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` no diretório `backend`. Copie o conteúdo de `.env.example` (se fornecido) ou crie-o do zero com as seguintes variáveis, ajustando-as à sua configuração do MySQL:
    ```env
    HOST=seu_host_mysql (ex: localhost)
    USER=seu_usuario_mysql (ex: root)
    PASSWORD=sua_senha_mysql
    DATABASE=seu_banco_de_dados (ex: user_management_db)
    PORT=3001 (ou qualquer porta de sua preferência para o servidor backend, garanta que corresponda às chamadas do frontend se alterado do padrão 3000)
    ```

4.  **Configure o banco de dados MySQL e a tabela:**
    Conecte-se ao seu servidor MySQL e execute o script SQL fornecido na seção 3 abaixo para criar o banco de dados necessário (se ainda não o fez) e a tabela `users`.

5.  **Inicie o servidor backend:**
    Usando npm:
    ```bash
    npm start
    ```
    Ou usando yarn:
    ```bash
    yarn start
    ```
    O servidor backend deve estar agora em execução (normalmente em `http://localhost:3000` ou na `PORT` que você especificou).

### Configuração do Frontend

1.  **Navegue até o diretório raiz do projeto (onde o `package.json` do frontend está localizado, geralmente a pasta principal do projeto se for uma configuração Vite):**
    ```bash
    cd .. 
    # (Se você estiver na pasta backend, caso contrário, navegue para a raiz do projeto)
    ```
    Ou, se o seu frontend estiver em um subdiretório específico como `frontend`:
    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**
    Usando npm:
    ```bash
    npm install
    ```
    Ou usando yarn:
    ```bash
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento do frontend:**
    Usando npm:
    ```bash
    npm run dev
    ```
    Ou usando yarn:
    ```bash
    yarn dev
    ```
    A aplicação deve estar agora acessível no seu navegador, normalmente em `http://localhost:5173` (padrão do Vite) ou outra porta especificada na saída.

## 3. Configuração do Banco de Dados MySQL

Este projeto requer um banco de dados MySQL para armazenar as informações dos usuários.

**Configuração:**

Conforme mencionado na configuração do backend, você deve criar um arquivo `.env` no diretório `backend` e preenchê-lo com os detalhes da sua conexão MySQL. O backend usa essas credenciais para se conectar ao seu banco de dados.

**Exemplo de conteúdo do arquivo `.env` para o backend:**
```env
HOST=localhost
USER=root
PASSWORD=sua_senha_secreta
DATABASE=user_management_db
PORT=3000
```

**Esquema da Tabela:**

Conecte-se à sua instância MySQL (usando uma ferramenta como MySQL Workbench, DBeaver ou a linha de comando) e execute o seguinte comando SQL para criar a tabela `users` dentro do banco de dados escolhido:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE,     -- Armazena dígitos brutos, frontend formata para XXX.XXX.XXX-XX
    telephone VARCHAR(30) NOT NULL, -- Armazena dígitos brutos, frontend formata
    data_birth DATE NOT NULL
);
```

**Nota sobre os campos `cpf` e `telephone`:** O banco de dados armazena os dígitos brutos para CPF (ex: `12345678901`) e telefone. A aplicação frontend lida com a formatação (ex: `123.456.789-01` para CPF e `(XX) XXXXX-XXXX` para telefone) para exibição e entrada do usuário.

---

Uma vez que estes passos sejam concluídos, você deverá ter um Sistema de Gerenciamento de Usuários totalmente funcional rodando localmente.