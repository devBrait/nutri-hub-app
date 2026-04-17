# NutriHub

Plataforma nutricional que conecta pacientes e nutricionistas. Permite o registo de refeições, acompanhamento de macros e comunicação direta entre paciente e profissional.

---

## Estrutura do repositório

```
nutri-hub/
├── backend/
│   ├── NutriHubAuth/      → Cadastro e autenticação de usuários
│   ├── NutriHubPatient/   → Gerenciamento de dados e conta do paciente
│   └── NutriHubClinic/    → Gerenciamento de nutricionistas, clínicas e seus pacientes
└── frontend/              → Cliente web (React 19 + TypeScript)
```

---

## Serviços

| Serviço | Responsabilidade | README |
|---|---|---|
| NutriHubAuth | Cadastro e autenticação de usuários | [ver](./backend/NutriHubAuth/README.md) |
| NutriHubPatient | Dados e conta do paciente | [ver](./backend/NutriHubPatient/README.md) |
| NutriHubClinic | Nutricionistas, clínicas e seus pacientes | [ver](./backend/NutriHubClinic/README.md) |
| Frontend | Cliente web da plataforma | [ver](./frontend/README.md) |

---

## Stack

| Camada | Tecnologias |
|---|---|
| Backend | .NET 10 / ASP.NET Core, FluentValidation, xUnit |
| Frontend | React 19, TypeScript, Vite 8, Material UI |
| Documentação | Swagger / OpenAPI |
