# Plataforma Freelancer

API para cadastrar e consultar projetos de freelancers, feita com Node.js, Express e SQLite, e executada com Docker.

> Trabalho de Desenvolvimento de Software – Sistemas de Informação – FACAPE (Ciência da Computação), 2026.2.

## Integrantes da equipe

- Michael de Sousa Santos
- Cézar Augusto Ferreira De Almeida
- Gabriel Gomes Souza
- Gabriel Henrique Lima Pontes
- Luiz Wagner de Luna Kestering

## Sobre o projeto

**Qual problema o sistema resolve?**
Quem precisa de um serviço (um site, um logotipo, uma tradução...) nem sempre sabe onde publicar o pedido de forma organizada. E quem trabalha como freelancer tem dificuldade para encontrar pedidos que combinem com as suas habilidades.

**Quem usaria o sistema?**
Dois tipos de pessoa: quem publica um projeto (o cliente) e quem procura projetos para trabalhar (o freelancer).

**Qual é o objetivo?**
Ter um lugar único onde os projetos são cadastrados com informações padronizadas (categoria, orçamento, prazo e habilidades) e podem ser consultados e filtrados.

**O que esta versão faz (MVP):** cadastra projetos, lista os projetos cadastrados e filtra por categoria e por status.
**O que ainda não faz:** login, edição, exclusão e pagamento. Também não tem interface visual, é só a API.

## Tecnologias utilizadas

| Tecnologia | Para que serve no projeto |
|---|---|
| Node.js | Executa o código da API (JavaScript no servidor) |
| Express | Cria as rotas (os endereços) da API |
| SQLite (`better-sqlite3`) | Banco de dados, guardado em um único arquivo |
| Docker e Docker Compose | Executam o projeto em um container, do mesmo jeito em qualquer computador |
| Node Test Runner e Supertest | Testes automáticos da API |
| Python, pandas e matplotlib | Análise dos dados cadastrados e geração de gráficos |

## Como o código está organizado

Cada pedido que chega à API passa por camadas, e cada camada tem uma única função:

```
Pedido HTTP  →  Rotas  →  Controller  →  Service  →  Repository  →  Banco SQLite
```

| Camada | Pasta | O que faz |
|---|---|---|
| Rotas | `src/routes` | Liga cada endereço a uma função do controller |
| Controller | `src/controllers` | Recebe o pedido e devolve a resposta (201, 400 ou 500) |
| Service | `src/services` | Aplica as regras de negócio: confere os dados antes de salvar |
| Repository | `src/repositories` | É o único que conversa com o banco (insere e consulta) |
| Model | `src/models` | Guarda as listas de valores permitidos (categorias e status) |
| Database | `src/database` | Abre o banco e cria a tabela |

Separar assim deixa o código mais fácil de entender, testar e trocar (princípio da responsabilidade única, do SOLID).

```
plataforma-freelancer/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── database/
│   ├── tests/
│   ├── app.js
│   └── server.js
├── db/
│   └── schema.sql
├── analise/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Como executar o projeto

### Com Docker (forma recomendada)

Você precisa do **Docker Desktop instalado e aberto**.

1. Baixe o projeto:
   ```
   git clone https://github.com/michaeldevbr/plataforma-freelancer.git
   cd plataforma-freelancer
   ```
2. Suba a aplicação:
   ```
   docker compose up
   ```
3. Quando aparecer `Servidor rodando na porta 3000.`, a API está pronta em `http://localhost:3000`.
4. Para parar, aperte `Ctrl+C` e rode `docker compose down`.

Na primeira vez demora um pouco, porque o Docker baixa o Node e instala as dependências. Se você alterar o código, use `docker compose up --build` para reconstruir a imagem.

**Onde ficam os dados?** No arquivo `db/banco.db`, dentro da sua pasta do projeto. Por isso os projetos cadastrados continuam lá depois de parar ou apagar o container. Para recomeçar do zero, pare o container e apague esse arquivo.

### Sem Docker

Você precisa do **Node.js 22 ou mais novo**.

```
npm install
npm start
```

A API sobe em `http://localhost:3000`. O banco é criado sozinho em `db/banco.db`.

## Como executar os testes

```
npm install
npm test
```

Os testes cobrem o cadastro válido, o cadastro inválido (regras de negócio), a consulta (GET) e as rotas. Eles usam um banco temporário na memória, então **não mexem nos dados reais**.

## Endpoints disponíveis

| Método | Rota | O que faz |
|---|---|---|
| GET | `/` | Apresenta o sistema |
| GET | `/projetos` | Lista os projetos cadastrados |
| POST | `/projetos` | Cadastra um novo projeto |

O `GET /projetos` aceita dois filtros opcionais: `categoria` e `status`. Sem filtros, lista todos os projetos.

### Dados de um projeto (corpo do POST)

| Campo | Obrigatório | Regra |
|---|---|---|
| `titulo` | Sim | Texto com no mínimo 5 caracteres e pelo menos uma letra (não pode ser só números ou símbolos) |
| `descricao` | Sim | Texto com no mínimo 30 caracteres |
| `categoria` | Sim | Uma das categorias válidas (lista abaixo) |
| `habilidades_requeridas` | Não | Texto livre, por exemplo `"HTML, CSS"` |
| `orcamento` | Sim | Número maior que zero (em reais) |
| `prazo` | Sim | Número inteiro de dias, maior que zero |
| `status` | Não | Um dos status válidos. Se não for enviado, fica `aberto` |

**Categorias válidas:** `desenvolvimento_web`, `desenvolvimento_mobile`, `design_grafico`, `ui_ux`, `redacao_copywriting`, `traducao`, `marketing_digital`, `edicao_video`, `analise_dados`.

**Status válidos:** `aberto`, `em_andamento`, `concluido`, `cancelado`.

### Respostas possíveis

| Código | Quando acontece |
|---|---|
| 201 | Projeto cadastrado com sucesso |
| 400 | Dados inválidos. A resposta traz a mensagem do que está errado |
| 500 | Erro interno do servidor |

## Exemplos de requisições

Pode usar o Thunder Client, o Postman ou qualquer cliente HTTP.

**Cadastrar um projeto válido**

```
POST http://localhost:3000/projetos
Content-Type: application/json

{
  "titulo": "Criação de logotipo",
  "descricao": "Preciso de um logotipo moderno para uma cafeteria de bairro.",
  "categoria": "design_grafico",
  "habilidades_requeridas": "Illustrator, identidade visual",
  "orcamento": 800,
  "prazo": 15
}
```

Resposta (`201`):

```json
{
  "id": 1,
  "titulo": "Criação de logotipo",
  "descricao": "Preciso de um logotipo moderno para uma cafeteria de bairro.",
  "categoria": "design_grafico",
  "habilidades_requeridas": "Illustrator, identidade visual",
  "orcamento": 800,
  "prazo": 15,
  "status": "aberto",
  "criado_em": "2026-11-13 14:30:00"
}
```

**Cadastrar um projeto inválido** (título só com números)

```
POST http://localhost:3000/projetos
Content-Type: application/json

{
  "titulo": "12345",
  "descricao": "Preciso de um logotipo moderno para uma cafeteria de bairro.",
  "categoria": "design_grafico",
  "orcamento": 800,
  "prazo": 15
}
```

Resposta (`400`):

```json
{
  "erro": "O título deve conter pelo menos uma letra."
}
```

**Listar todos os projetos**

```
GET http://localhost:3000/projetos
```

**Listar só os projetos de design que estão abertos**

```
GET http://localhost:3000/projetos?categoria=design_grafico&status=aberto
```

## Banco de dados

O banco é o SQLite, que guarda tudo em um arquivo (`db/banco.db`). Ele tem uma tabela, `projetos`, com as colunas `id`, `titulo`, `descricao`, `categoria`, `habilidades_requeridas`, `orcamento`, `prazo_dias`, `status` e `criado_em`. Na resposta da API, a coluna `prazo_dias` aparece como `prazo`.

| O que acontece | Onde |
|---|---|
| Conexão com o banco | `src/database/connection.js` |
| Criação da tabela | `db/schema.sql`, executado quando a aplicação inicia |
| Inserção de dados | `criar()` em `src/repositories/projetoRepository.js` |
| Consulta de dados | `listar()` em `src/repositories/projetoRepository.js` |

**Duas proteções para os dados:** as regras são conferidas no Service e também no próprio banco (restrições `CHECK` do `schema.sql`).

**Segurança:** as consultas usam parâmetros (`?`) em vez de juntar texto no comando SQL, o que protege contra SQL injection.

## Análise de dados com pandas

A pasta `analise/` tem um script em Python que lê os projetos do banco e mostra:

- quantidade de projetos por categoria e por status;
- orçamento médio por categoria;
- dois gráficos em PNG, salvos na própria pasta `analise/`.

Para rodar, cadastre alguns projetos pela API antes (o script precisa de dados) e depois:

```
cd analise
pip install -r requirements.txt
python analise_projetos.py
```

## Licença

Projeto sob a licença MIT. Veja o arquivo `LICENSE`.

## Palavras que aparecem neste documento

- **API:** um programa que recebe pedidos de outros programas e responde com dados.
- **Endpoint (rota):** um endereço da API, como `/projetos`.
- **GET e POST:** tipos de pedido. GET busca informações, POST envia informações novas.
- **JSON:** formato de texto para trocar dados, no estilo `{ "campo": "valor" }`.
- **Container:** um "pacote" com a aplicação e tudo o que ela precisa, que roda igual em qualquer computador.
- **Regra de negócio:** uma regra do problema real, como "o orçamento precisa ser maior que zero".
