# Finance Track

Aplicação web Full Stack para gerenciamento financeiro pessoal, permitindo o controle de receitas, despesas e investimentos através de uma interface moderna e integrada a uma API REST desenvolvida em Node.js.

> Este projeto foi desenvolvido com foco em escalabilidade, componentização, experiência do usuário e boas práticas de desenvolvimento Frontend.

---

# Demonstração

Deploy

https://finance-track-eta-five.vercel.app/

Backend

https://github.com/Diasszx/finance-app-api

---

# Preview

> Em breve serão adicionadas imagens e GIFs demonstrando o funcionamento da aplicação.

---

# Arquitetura

```text
Usuário
    │
    ▼
React
    │
    ▼
React Router
    │
    ▼
Pages
    │
    ▼
Components
    │
    ▼
TanStack Query
    │
    ▼
Axios
    │
    ▼
Finance Track API
```

A aplicação foi organizada em módulos reutilizáveis para facilitar manutenção, escalabilidade e evolução do sistema.

---

# Tecnologias

## Frontend

- React
- TypeScript
- Vite

## Interface

- Tailwind CSS
- shadcn/ui

## Gerenciamento de Estado

- Context API

## Requisições

- Axios
- TanStack Query

## Formulários

- React Hook Form
- Zod

## Roteamento

- React Router

## Ferramentas

- Git
- GitHub
- GitHub Actions
- ESLint
- Prettier

---

# Backend

Esta aplicação consome a API do projeto Finance Track.

Repositório

https://github.com/Diasszx/finance-app-api

Tecnologias utilizadas na API

- Node.js
- Express
- PostgreSQL
- TypeScript

---

# Funcionalidades

## Autenticação

- Login
- Persistência da sessão
- Armazenamento do token JWT
- Rotas protegidas

---

## Dashboard

- Visualização das informações financeiras
- Indicadores
- Atualização dinâmica

---

## Transações

- Cadastro
- Listagem
- Atualização
- Exclusão

---

## Experiência do usuário

- Feedback visual
- Notificações
- Validação de formulários
- Navegação protegida
- Responsividade

---

# Estrutura do Projeto

```text
src
│
├── assets
├── components
├── contexts
├── hooks
├── layouts
├── lib
├── pages
├── routes
├── services
├── types
├── utils
└── main.tsx
```

Cada diretório possui uma responsabilidade específica, reduzindo acoplamento e facilitando manutenção.

---

# Fluxo da Aplicação

```text
Usuário

↓

React Router

↓

Página

↓

Componentes

↓

TanStack Query

↓

Axios

↓

Finance Track API

↓

PostgreSQL
```

---

# Gerenciamento de Estado

A aplicação utiliza duas estratégias.

## Context API

Responsável pelo estado global.

Exemplos

- usuário autenticado
- sessão

---

## TanStack Query

Responsável pelos dados vindos da API.

Benefícios

- cache automático
- refetch
- sincronização
- invalidação de queries

---

# Validação

Todos os formulários utilizam

- React Hook Form

junto com

- Zod

Garantindo validações consistentes entre frontend e backend.

---

# Comunicação com a API

Fluxo simplificado

```text
React

↓

Axios

↓

JWT

↓

Finance Track API

↓

PostgreSQL
```

---

# Como executar

## Clonar

```bash
git clone https://github.com/Diasszx/finance-track.git
```

---

## Instalar

```bash
npm install
```

---

## Executar

```bash
npm run dev
```

---

# Variáveis de Ambiente

Crie um arquivo

```
.env
```

Exemplo

```env
VITE_API_URL=http://localhost:3000
```

---

# Scripts

Desenvolvimento

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

Lint

```bash
npm run lint
```

---

# Responsividade

A interface foi construída seguindo abordagem Mobile First.

Compatível com

- Desktop
- Notebook
- Tablet
- Smartphone

---

# Integração

Frontend

React

↓

REST API

↓

Node.js

↓

PostgreSQL

---

# Roadmap

## Em desenvolvimento

- Dashboard mais completo
- Indicadores financeiros
- Melhorias na UX

## Próximas funcionalidades

- Tema Dark
- Categorias
- Paginação
- Busca
- Filtros avançados
- Gráficos
- Exportação de dados
- Upload de comprovantes

---

# Qualidade de Código

O projeto segue princípios como

- Componentização
- Reutilização
- Clean Code
- Separação de responsabilidades
- Hooks customizados
- Organização modular
- Tipagem forte

---

# CI/CD

O projeto utiliza GitHub Actions para executar automaticamente:

- Instalação das dependências
- Lint
- Build

Garantindo que alterações não quebrem a aplicação antes do merge.

---

# Stack Completa

Frontend

- React
- TypeScript
- Tailwind
- TanStack Query
- React Hook Form
- Zod

Backend

- Node.js
- Express
- PostgreSQL
- JWT

Infra

- GitHub Actions
- Vercel
- Render
- Docker

---

# Próximos Passos

- Deploy da API na AWS
- Docker Compose
- Testes automatizados
- Swagger
- Monitoramento
- CI/CD completo
- Infraestrutura em nuvem

---

# Autor

Adam Dias

LinkedIn

GitHub
