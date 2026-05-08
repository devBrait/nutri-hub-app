# NutriHub

Plataforma nutricional que conecta pacientes e nutricionistas. Permite o registro de refeições, acompanhamento de macronutrientes, monitoramento de peso e comunicação direta entre paciente e profissional.

> Projeto desenvolvido para a disciplina de **Engenharia de Software** — Ciência da Computação, 6º Semestre  
> **Universidade Presbiteriana Mackenzie**

---

## Integrantes

| Nome | RA |
|---|---|
| Luís Henrique Ribeiro Fernandes | 10420079 |
| Guilherme Teodoro de Oliveira | 10425362 |
| Vinícius Brait Lorimier | 10420046 |

---

## Visão Geral

O NutriHub é composto por três microsserviços backend independentes e um cliente web. Cada serviço possui seu próprio banco de dados PostgreSQL e se comunica via JWT compartilhado.

```
nutri-hub/
├── backend/
│   ├── NutriHubAuth/      → Cadastro e autenticação de usuários
│   ├── NutriHubPatient/   → Dados do paciente, refeições e metas nutricionais
│   └── NutriHubClinic/    → Nutricionistas, vínculos e convites
└── frontend/              → Cliente web (React 19 + TypeScript)
```

---

## Funcionalidades

### Paciente
- Cadastro e autenticação
- Onboarding com dados pessoais (peso, altura, nível de atividade, objetivo)
- Registro de refeições (café, almoço, lanche, jantar) com busca de alimentos
- Resumo diário de calorias e macronutrientes (proteína, carboidrato, gordura)
- Histórico e controle de peso
- Busca e vinculação com nutricionistas

### Nutricionista
- Cadastro com número de CRN
- Gerenciamento de pacientes vinculados
- Envio de convites por e-mail
- Visualização de diário alimentar e evolução de peso dos pacientes
- Aceite ou recusa de solicitações de acompanhamento

---

## Serviços

| Serviço | Responsabilidade | Porta Local | README |
|---|---|---|---|
| NutriHubAuth | Cadastro e autenticação de usuários | `5225` | [ver](./backend/NutriHubAuth/README.md) |
| NutriHubPatient | Dados e conta do paciente | `5081` | [ver](./backend/NutriHubPatient/README.md) |
| NutriHubClinic | Nutricionistas, clínicas e seus pacientes | `5249` | [ver](./backend/NutriHubClinic/README.md) |
| Frontend | Cliente web da plataforma | `5173` | [ver](./frontend/README.md) |

---

## Stack

| Camada | Tecnologias |
|---|---|
| Backend | .NET 10 / ASP.NET Core, Entity Framework Core 10, FluentValidation, xUnit |
| Frontend | React 19, TypeScript, Vite 8, Material UI, React Router DOM 7, Axios |
| Banco de Dados | PostgreSQL |
| Documentação | OpenAPI + Scalar UI (todos os serviços em `/doc/scalar`) |
| Containerização | Docker / Docker Compose |

---

## Como executar localmente

### Pré-requisitos

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) ou [Docker](https://www.docker.com/)

### Opção 1 — Docker Compose (recomendado)

```bash
docker-compose up
```

Sobe todos os serviços backend nas portas `5225`, `5081` e `5249`.

### Opção 2 — Individualmente

```bash
# Auth Service → http://localhost:5225/doc/scalar
dotnet run --project backend/NutriHubAuth/src/NutriHubAuth.API

# Patient Service → http://localhost:5081/doc/scalar
dotnet run --project backend/NutriHubPatient/src/NutriHubPatient.API

# Clinic Service → http://localhost:5249/doc/scalar
dotnet run --project backend/NutriHubClinic/src/NutriHubClinic.API
```

```bash
# Frontend → http://localhost:5173
cd frontend
npm install
npm run dev
```

### Variáveis de ambiente (backend)

Cada serviço requer as seguintes variáveis:

```env
ConnectionStrings__DefaultConnection=<PostgreSQL connection string>
Jwt__Secret=<string aleatória com 32+ caracteres>
Jwt__Issuer=NutriHubAuth
Jwt__Audience=NutriHub
Jwt__ExpiresInMinutes=60
```

### Variáveis de ambiente (frontend)

Crie o arquivo `frontend/.env` a partir do `frontend/.env.example`:

```env
VITE_AUTH_API_URL=https://nutrihub-auth.onrender.com
VITE_PATIENT_API_URL=https://nutrihub-patient.onrender.com
VITE_CLINIC_API_URL=https://nutrihub-clinic.onrender.com
```

### Executando os testes

```bash
dotnet test backend/NutriHubAuth/tests/NutriHubAuth.Tests
dotnet test backend/NutriHubPatient/tests/NutriHubPatient.Tests
dotnet test backend/NutriHubClinic/tests/NutriHubClinic.Tests
```

---

## Fluxo de Autenticação

```
1. Frontend  →  POST /api/auth/register ou /login  →  NutriHubAuth
2. NutriHubAuth  →  retorna accessToken (JWT) + refreshToken
3. Frontend armazena tokens no localStorage
4. Frontend  →  requisições para NutriHubPatient e NutriHubClinic
               com header: Authorization: Bearer {accessToken}
5. Cada serviço valida o JWT de forma independente (segredo compartilhado)
```

---

## Implantação

O projeto está configurado para deploy na plataforma [Render](https://render.com/) via `render.yaml`. Os serviços de produção são:

| Serviço | URL |
|---|---|
| NutriHubAuth | `https://nutrihub-auth.onrender.com` |
| NutriHubPatient | `https://nutrihub-patient.onrender.com` |
| NutriHubClinic | `https://nutrihub-clinic.onrender.com` |
| Frontend | Vercel (`vercel.json` configurado) |
