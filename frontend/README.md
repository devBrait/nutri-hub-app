# NutriHub — Frontend

Cliente web da plataforma NutriHub, desenvolvido para pacientes e nutricionistas.

[← Voltar ao repositório principal](../README.md)

---

## Arquitetura

Organizado por **Arquitetura Orientada a Features**, agrupando código por funcionalidade em vez de tipo de arquivo. Facilita a escalabilidade e o isolamento de mudanças.

```
frontend/src/
├── components/        → Componentes reutilizáveis (layout, navegação, UI compartilhada)
├── features/          → Módulos por funcionalidade (auth, diet, home, nutritionist, onboarding, profile)
├── pages/             → Composição de páginas a partir de features e componentes
├── hooks/             → Custom hooks globais
├── contexts/          → Estado global (tema claro/escuro)
├── lib/
│   └── api/           → Clientes HTTP por serviço (auth, patient, clinic, food)
├── types/             → Definições de tipos TypeScript
└── utils/             → Helpers e utilitários globais
```

---

## Rotas

### Públicas

| Rota | Descrição |
|---|---|
| `/` | Landing page com apresentação da plataforma |
| `/login` | Tela de login |
| `/register` | Tela de cadastro |
| `/onboarding` | Wizard de onboarding (dados pessoais e objetivos) |
| `/accept-invite/:token` | Aceitar convite enviado por nutricionista |

### Paciente (protegidas por role guard)

| Rota | Descrição |
|---|---|
| `/diet` | Dashboard principal com diário alimentar e resumo de macros |
| `/meal` | Adição e edição de refeições |
| `/food-search` | Busca e adição de alimentos a uma refeição |
| `/profile` | Perfil do paciente com histórico de peso |
| `/nutritionists` | Lista de nutricionistas disponíveis |

### Nutricionista (protegidas por role guard)

| Rota | Descrição |
|---|---|
| `/nutritionist/dashboard` | Visão geral de pacientes e solicitações |
| `/nutritionist/patients` | Lista de pacientes vinculados |
| `/nutritionist/patients/:patientId` | Detalhes do paciente (diário, evolução de peso) |
| `/nutritionist/invitations` | Gerenciamento de convites enviados |
| `/nutritionist/profile` | Perfil e configurações do nutricionista |

---

## Serviços de API

Os clientes HTTP ficam em `src/lib/api/` e se comunicam com os microsserviços backend:

| Arquivo | Responsabilidade |
|---|---|
| `auth.service.ts` | Registro, login, logout, armazenamento de tokens |
| `patient.service.ts` | Perfil, onboarding, refeições, resumo diário, peso |
| `clinic.service.ts` | Nutricionistas, convites, vínculos, solicitações |
| `food.service.ts` | Busca de alimentos no banco |
| `httpClient.ts` | Instância Axios com base URL e interceptors |

**URLs de produção padrão:**

| Serviço | URL |
|---|---|
| Auth | `https://nutrihub-auth.onrender.com` |
| Patient | `https://nutrihub-patient.onrender.com` |
| Clinic | `https://nutrihub-clinic.onrender.com` |

---

## Como executar

```bash
npm install
npm run dev
# Disponível em: http://localhost:5173
```

## Como fazer build

```bash
npm run build
npm run preview
```

---

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila TypeScript e gera bundle de produção |
| `npm run lint` | Executa o linter (Biome) |

---

## Armazenamento local (localStorage)

| Chave | Conteúdo |
|---|---|
| `accessToken` | JWT de autenticação |
| `refreshToken` | Token de renovação de sessão |
| `role` | Role do usuário (`Patient` ou `Nutritionist`) |
| `nutrihub:theme-mode` | Preferência de tema (`light` ou `dark`) |

---

## Stack

| | |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 8 |
| UI | Material UI 9 + Emotion |
| Ícones | Material UI Icons |
| Roteamento | React Router DOM 7 |
| HTTP | Axios 1.9 |
| Notificações | Notistack 3 |
| Linter / Formatter | Biome.js 2.4 |
