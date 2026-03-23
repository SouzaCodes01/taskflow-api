# 🚀 TaskFlow API

API RESTful robusta para gerenciamento de tarefas, construída com **Node.js**, **Express** e **PostgreSQL**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)

## 📋 Funcionalidades

- ✅ **Autenticação JWT** — Registro, login e refresh tokens
- ✅ **CRUD completo** de tarefas com categorias e prioridades
- ✅ **Validação de dados** com Zod
- ✅ **Paginação e filtros** avançados
- ✅ **Rate limiting** e proteção contra brute-force
- ✅ **Documentação Swagger/OpenAPI**
- ✅ **Docker Compose** para ambiente de desenvolvimento
- ✅ **Testes automatizados** com Jest e Supertest
- ✅ **Clean Architecture** — Separação clara de responsabilidades

## 🏗️ Arquitetura

```
src/
├── config/          # Configurações (DB, env, cors)
├── controllers/     # Controladores HTTP
├── middlewares/     # Auth, validation, error handling
├── models/          # Modelos do banco de dados
├── routes/          # Definição de rotas
├── services/        # Lógica de negócio
├── utils/           # Helpers e utilitários
├── validators/      # Schemas de validação
└── app.js           # Entry point
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+ (ou Docker)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SouzaCodes01/taskflow-api.git
cd taskflow-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Com Docker (recomendado)
docker-compose up -d

# Ou rode manualmente
npm run migrate
npm run dev
```

### Variáveis de Ambiente

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## 📡 Endpoints da API

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/auth/register` | Criar nova conta |
| POST | `/api/auth/login` | Fazer login |
| POST | `/api/auth/refresh` | Renovar token |
| GET | `/api/auth/me` | Perfil do usuário |

### Tarefas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/tasks` | Listar tarefas (com filtros) |
| GET | `/api/tasks/:id` | Detalhes de uma tarefa |
| POST | `/api/tasks` | Criar nova tarefa |
| PUT | `/api/tasks/:id` | Atualizar tarefa |
| PATCH | `/api/tasks/:id/status` | Alterar status |
| DELETE | `/api/tasks/:id` | Remover tarefa |

### Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/categories` | Listar categorias |
| POST | `/api/categories` | Criar categoria |

## 🧪 Testes

```bash
# Rodar todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 🐳 Docker

```bash
# Subir toda a stack
docker-compose up -d

# Ver logs
docker-compose logs -f api
```

## 📄 Licença

MIT © [SouzaCodes01](https://github.com/SouzaCodes01)
