# Rick and Morty - Fullstack Application

Aplicação fullstack para gerenciar personagens favoritos de Rick and Morty com autenticação JWT.

## 🏗️ Estrutura do Projeto

```
rick_and_morty/
├── backend/          # API NestJS
│   ├── src/
│   ├── test/
│   └── package.json
├── frontend/         # App React + Vite
│   ├── src/
│   └── package.json
└── package.json      # Scripts raiz para gerenciar ambos
```

## 🚀 Tecnologias

### Backend
- NestJS
- TypeORM
- SQLite
- JWT Authentication
- TypeScript

### Frontend
- React
- TypeScript
- Vite
- React Router
- Axios

## 📦 Instalação

### Instalar todas as dependências (backend + frontend)
```bash
npm run install:all
```

### Ou instalar separadamente
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## 🔧 Configuração

### Backend
1. Copie o arquivo `.env.example` para `.env` no diretório backend:
```bash
cd backend
cp .env.example .env
```

2. Configure as variáveis de ambiente no `.env`:
```env
PORT=3000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

## 🏃 Executando o Projeto

### Desenvolvimento (ambos simultaneamente)
```bash
npm run dev
```

### Ou execute separadamente:

**Backend** (porta 3000):
```bash
npm run dev:backend
```

**Frontend** (porta 5173):
```bash
npm run dev:frontend
```

## 🔨 Build

```bash
# Build completo (backend + frontend)
npm run build

# Ou separadamente
npm run build:backend
npm run build:frontend
```

## ✅ Testes

```bash
# Testes do backend
npm run test:backend
```

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Tokens) para autenticação:

- Tokens são gerados no login
- Armazenados no localStorage do navegador
- Enviados no header `Authorization: Bearer <token>`
- Validados pelo backend em rotas protegidas

## 📝 API Endpoints

### Autenticação
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout

### Personagens (Protegido)
- `GET /my-characters` - Listar personagens favoritos
- `POST /my-characters` - Adicionar personagem favorito
- `DELETE /my-characters/:id` - Remover personagem favorito

## 📂 Estrutura do Backend

```
backend/src/
├── auth/              # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── user.entity.ts
├── my-characters/     # Módulo de personagens
└── main.ts
```

## 🎨 Estrutura do Frontend

```
frontend/src/
├── components/
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── pages/
├── services/
│   └── api.ts
└── App.tsx
```

## 📄 Licença

MIT
