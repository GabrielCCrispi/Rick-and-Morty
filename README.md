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

## 🔧 Configuração

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

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação segura:

1. **Registro**: Usuário cria uma conta com username e senha
2. **Login**: Credenciais são validadas e um token JWT é gerado
3. **Armazenamento**: Token é armazenado no `localStorage` do navegador
4. **Autorização**: Token é enviado no header `Authorization: Bearer <token>` em cada requisição
5. **Validação**: Backend valida o token em rotas protegidas usando Guards

#### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "rick", "password": "morty123"}'
```

#### Adicionar personagem favorito
```bash
curl -X POST http://localhost:3000/my-characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "gender": "Male",
    "origin": "Earth (C-137)",
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "originalCharacterId": 1
  }'
```

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
- SQLite armazenado em `backend/db.sqlite`
- Gerenciado pelo TypeORM
- Tabelas: `user` e `favorite_character`

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

### Contextos
- **AuthContext**: Gerencia estado de autenticação global

### Hooks Customizados
- **useToast**: Sistema de notificações toast

## 🐛 Troubleshooting

### ❌ Erro: "Cannot find module 'sqlite3'"
**Solução:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Backend não inicia / Erro na porta 3000
**Causa**: Porta 3000 já está em uso por outro processo

**Solução 1** - Liberar a porta:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Solução 2** - Mudar a porta no `.env`:
```env
PORT=3001  # Use outra porta
```

### ❌ Frontend não conecta ao backend
**Verificações:**
1. Backend está rodando? Acesse http://localhost:3000 - deve retornar algo
2. Verifique a URL da API em `frontend/src/services/api.ts`
3. Confirme que não há erro de CORS no console do navegador
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

### ❌ Erro: "ENOENT: no such file or directory, open '.env'"
**Solução:**
```bash
cd backend
cp .env.example .env
# Edite o .env e configure a JWT_SECRET
```

### ❌ Erro de autenticação / Token inválido
**Solução:**
1. Limpe o localStorage do navegador:
   - Abra o DevTools (F12)
   - Vá em Application > Local Storage
   - Delete todos os itens
2. Verifique se o `JWT_SECRET` está configurado no `backend/.env`
3. Reinicie o backend
4. Faça login novamente

### ❌ Banco de dados não é criado
**Solução:**
```bash
cd backend
# Remove o banco antigo se existir
rm -f db.sqlite
# Reinicia o backend - ele criará automaticamente
npm run start:dev
```

### ❌ Erro: "npm: command not found"
**Causa**: Node.js/npm não está instalado

**Solução:**
1. Instale o Node.js em https://nodejs.org/
2. Reinicie o terminal
3. Verifique: `node --version && npm --version`

### ❌ Dependências não instalam (npm install falha)
**Solução:**
```bash
# Limpa cache do npm
npm cache clean --force

# Remove node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstala
npm install
```

### ❌ Erro de permissão no Linux/Mac
**Solução:**
```bash
# NÃO use sudo npm install!
# Corrija as permissões do npm:
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER ~/rick_and_morty
```

### ✅ Tudo ainda não funciona?
1. **Certifique-se** que Node.js v16+ está instalado
2. **Delete** todas as pastas `node_modules` (backend e frontend)
3. **Delete** todos os `package-lock.json`
4. **Execute** novamente o início rápido do README
5. **Verifique** os logs do terminal para erros específicos

---

## ✅ Checklist de Instalação

Use este checklist para garantir que tudo está configurado corretamente:

- [ ] Node.js v16+ instalado (`node --version`)
- [ ] npm v7+ instalado (`npm --version`)
- [ ] Repositório clonado
- [ ] Backend: `npm install` executado
- [ ] Frontend: `npm install` executado
- [ ] Arquivo `backend/.env` criado (copiado de `.env.example`)
- [ ] `JWT_SECRET` configurado no `backend/.env`
- [ ] Backend rodando em http://localhost:3000 (Terminal 1)
- [ ] Frontend rodando em http://localhost:5173 (Terminal 2)
- [ ] Página inicial abre sem erros
- [ ] Consegue registrar um novo usuário
- [ ] Consegue fazer login
- [ ] Consegue ver personagens
- [ ] Consegue adicionar favoritos

**Se todos os itens estão marcados, parabéns! 🎉 Seu projeto está funcionando perfeitamente!**

---

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

