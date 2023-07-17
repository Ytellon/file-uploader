# File Uploader 📤



Consiste em criar uma aplicação usando o RedwoodJS, uma framework em NodeJS. Foi  

Utilizado JavaScript para resolver o problema.

A aplicação consiste em uma página em React que permite aos usuários fazer o upload de arquivos através da interface do usuário. Caso um arquivo duplicado seja selecionado para upload, a operação deve ser ignorada, tratando-se como uma operação sem efeito (no-op). Os arquivos são armazenados no FileStack.

Os principais requisitos incluem a implementação de endpoints de API para realizar operações de GET, DELETE, CREATE e PATCH de arquivos. A interface do usuário deve exibir todos os arquivos que o usuário enviou.


> **Pré-requisitos**
> 
> -  [Node.js](https://nodejs.org/en/) (>=18.x) e [Yarn](https://yarnpkg.com/) (>=1.15)
> - Você está no Windows? Para obter melhores resultados, siga nosso guia [configuração de desenvolvimento do Windows](https://redwoodjs.com/docs/how-to/windows-development-setup)

Em seguida, mude para esse diretório e inicie o servidor de desenvolvimento:

```
cd file-uploader
```

Comece instalando as dependências:

```
yarn install
```

Crie um arquivo na raiz do projeto chamado `.env` e copie os valores contidos em

`.env.example`

```
REDWOOD_ENV_FILESTACK_API_KEY="your filestack api key"

REDWOOD_ENV_FILESTACK_SECRET="your filestack secret"
```

Em seguida, atualize o banco de dados e inicie o servidor de desenvolvimento:

```
yarn rw prisma migrate dev && yarn redwood dev
```

Seu navegador deve abrir automaticamente em http://localhost:8910, onde você verá a página inicial de criar um novo upload, com links para muitos recursos. 💻
