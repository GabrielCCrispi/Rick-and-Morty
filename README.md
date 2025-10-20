# Rick and Morty - Fullstack Application

Aplicação fullstack para explorar e gerenciar personagens favoritos do universo Rick and Morty, com sistema completo de autenticação JWT e integração com a API oficial do Rick and Morty.

## 🌟 Funcionalidades

- 📊 Dashboard com estatísticas da API Rick and Morty
- 👥 Listagem completa de personagens com paginação
- 🔍 Busca e filtros de personagens
- ⭐ Sistema de favoritos (salvar personagens)
- 🔐 Autenticação e registro de usuários com JWT
- 📱 Interface responsiva e animações fluidas
- 🎨 Design moderno inspirado no tema do Rick and Morty

## 🚀 Tecnologias

### Backend
- **NestJS** - Framework Node.js progressivo
- **TypeORM** - ORM para TypeScript e JavaScript
- **SQLite** - Banco de dados leve
- **JWT** - Autenticação via JSON Web Tokens
- **bcrypt** - Criptografia de senhas
- **TypeScript** - Superset JavaScript com tipagem

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool extremamente rápido
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado

### API Externa
- **Rick and Morty API** - API pública oficial (https://rickandmortyapi.com)

## 📦 Instalação e Configuração

### ⚡ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

#### Requisitos Obrigatórios:
- **Node.js** (versão 16 ou superior, recomendado v18+) - [Download aqui](https://nodejs.org/)
- **npm** (versão 7 ou superior, vem automaticamente com Node.js)
- **Git** - Para clonar o repositório

#### Verificar instalação:
```bash
node --version  # Deve mostrar v16.x.x ou superior
npm --version   # Deve mostrar 7.x.x ou superior
git --version   # Deve mostrar a versão do git
```

### 📋 Dependências do Projeto

O projeto possui TODAS as dependências necessárias nos arquivos `package.json`. **Não é necessário instalar nada manualmente além do Node.js!**

#### Backend (NestJS):
- **Framework**: NestJS 11.x
- **Banco de dados**: SQLite3 (incluído, sem instalação externa necessária)
- **ORM**: TypeORM
- **Autenticação**: JWT (Passport)
- **Todas as dependências são instaladas automaticamente via npm**

#### Frontend (React + Vite):
- **Framework**: React 19
- **Build tool**: Vite
- **Roteamento**: React Router DOM
- **HTTP Client**: Axios
- **Todas as dependências são instaladas automaticamente via npm**

> **✅ IMPORTANTE**: O SQLite já vem incluído nas dependências do backend (`sqlite3` package). Você **NÃO precisa** instalar nenhum banco de dados separadamente!

### 🚀 Início Rápido (TL;DR)

```bash
# 1. Clone e entre no diretório
git clone git@github.com:GabrielCCrispi/Rick-and-Morty.git
cd rick_and_morty

# 2. Configure o backend
cd backend
cp .env.example .env #MAC/LINUX
copy .env.example .env #Windows
# IMPORTANTE: Edite o .env e troque a JWT_SECRET!
npm install
cd ..

# 3. Configure o frontend
cd frontend
npm install
cd ..

# 4. Execute (em terminais separados)
# Terminal 1:
cd backend && npm run start:dev

# Terminal 2:
cd frontend && npm run dev
```

Acesse: http://localhost:5173

### ✅ O que funciona automaticamente (sem configuração extra):

Após seguir os passos acima, tudo funcionará out-of-the-box:

- ✅ **Banco de dados SQLite** - Criado automaticamente na primeira execução
- ✅ **Tabelas do banco** - TypeORM cria/sincroniza automaticamente
- ✅ **Sistema de Login/Registro** - Pronto para uso
- ✅ **Sistema de Favoritos** - Funcionando completamente
- ✅ **Integração com API do Rick and Morty** - Sem necessidade de API key

**Não é necessário:**
- ❌ Instalar/configurar PostgreSQL, MySQL ou qualquer outro banco
- ❌ Criar tabelas manualmente
- ❌ Configurar variáveis de ambiente complexas (apenas o `.env`)
- ❌ API keys externas

---

### ⚙️ Backend - Configuração Obrigatória

**⚠️ IMPORTANTE:** O backend precisa de um arquivo `.env` para funcionar!

#### Passo a passo:

1. **Navegue até o diretório do backend:**
   ```bash
   cd backend
   ```

2. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

3. **Edite o arquivo `.env`** e configure:
   ```env
   PORT=3000
   JWT_SECRET=sua-chave-jwt-super-segura-aqui  # ⚠️ TROQUE ISSO!
   JWT_EXPIRES_IN=7d
   ```

#### 🔐 Como gerar uma JWT_SECRET segura:

Execute no terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie a string gerada e cole no lugar de `sua-chave-jwt-super-segura-aqui`.

> **⚠️ SEGURANÇA:**
> - O arquivo `.env` **NÃO** vai para o GitHub (está no `.gitignore`)
> - Cada desenvolvedor deve criar seu próprio `.env`
> - Nunca compartilhe sua `JWT_SECRET` em produção!

## 🎨 Páginas e Rotas

### Públicas
- `/` - Dashboard com estatísticas da API
- `/personagens` - Lista de todos os personagens
- `/personagens/:id` - Detalhes de um personagem
- `/login` - Página de login
- `/register` - Página de registro

### Protegidas (Requer autenticação)
- `/meus-personagens` - Personagens favoritos do usuário

## 📂 Detalhamento do Backend

### Módulos

#### Auth Module
- **Responsabilidades**: Registro, login, validação JWT
- **Arquivos principais**:
- `auth.service.ts` - Lógica de negócio
- `auth.controller.ts` - Endpoints REST
  - `jwt.strategy.ts` - Estratégia de validação JWT
  - `jwt-auth.guard.ts` - Guard para rotas protegidas
  - `user.entity.ts` - Entidade de usuário

#### My Characters Module
- **Responsabilidades**: CRUD de personagens favoritos
- **Arquivos principais**:
  - `my-characters.service.ts` - Lógica de negócio
  - `my-characters.controller.ts` - Endpoints REST
  - `favorite-character.entity.ts` - Entidade de personagem

### Banco de Dados

#### 📦 SQLite - Criação Automática

O banco de dados SQLite é **criado automaticamente** na primeira execução do backend:

- **Localização**: `backend/db.sqlite` (arquivo local, não vai para o GitHub)
- **ORM**: TypeORM gerencia tudo automaticamente
- **Tabelas**: `users` e `characters` são criadas na primeira execução
- **Sincronização**: Com `synchronize: true`, o TypeORM cria/atualiza as tabelas automaticamente

**⚠️ IMPORTANTE**:
- O arquivo `db.sqlite` **NÃO** está no repositório Git (`.gitignore`)
- Cada desenvolvedor terá seu próprio banco local
- Ao clonar o projeto, o banco será criado vazio na primeira execução
- Seus dados ficam apenas na sua máquina

#### 🔄 Como funciona:

1. **Primeira execução**: `npm run start:dev`
   - TypeORM detecta que não existe `db.sqlite`
   - Cria o arquivo automaticamente
   - Cria todas as tabelas definidas nas entities

2. **Execuções seguintes**:
   - Usa o banco existente
   - Sincroniza alterações nas entities (se houver)

#### 💾 Resetar o banco:

Se quiser começar do zero:
```bash
cd backend
rm db.sqlite
npm run start:dev  # Cria um novo banco vazio
```

## 🎨 Detalhamento do Frontend

### Componentes Modulares

#### Home/
Componentes organizados da página inicial:
- `DashboardHeader.tsx` - Cabeçalho com título e animação
- `StatsGrid.tsx` - Grade de estatísticas da API
- `UserStats.tsx` - Estatísticas do usuário logado
- `FavoritesList.tsx` - Lista dos últimos favoritos
- `LoadingSpinner.tsx` - Componente de carregamento

### Estilos
- `home.styles.ts` - Estilos tipados para componentes Home
- `animations.css` - Animações CSS (fadeIn, float, etc.)

### Hooks Customizados
- **useToast**: Sistema de notificações toast

## 📈 Melhorias Futuras

- [ ] Testes unitários e E2E completos
- [ ] Paginação no lado do servidor
- [ ] Sistema de busca avançada
- [ ] Temas claro/escuro
- [ ] PWA (Progressive Web App)
- [ ] Docker e Docker Compose
- [ ] CI/CD pipeline

## Desenvolvedor :octocat:
| [<img src="https://avatars.githubusercontent.com/u/122823447?v=4" width="115"><br><sub>Gabriel Crispi</sub>](https://github.com/GabrielCCrispi) 
| :---: |

