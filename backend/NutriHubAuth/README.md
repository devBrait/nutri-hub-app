# NutriHubAuth

Microsserviço responsável pelo cadastro e autenticação de usuários (Pacientes e Nutricionistas) da plataforma NutriHub.

---

## Arquitetura

Utiliza arquitetura em camadas simples, por se tratar de um serviço focado exclusivamente na validação de credenciais.

```
NutriHubAuth/
├── src/
│   └── NutriHubAuth.API/
│       ├── Controllers/       → Recebe e responde requisições HTTP
│       ├── UseCases/          → Lógica de negócio (registro, autenticação)
│       ├── Repositories/      → Acesso a dados
│       ├── Models/            → Entidades, DTOs e Enums
│       └── Validators/        → Regras de validação com FluentValidation
└── tests/
    └── NutriHubAuth.Tests/    → Testes unitários
```

---

## Endpoints

| Método | Rota | Descrição | Status |
|---|---|---|---|
| POST | `/api/auth/register` | Cadastro de usuário | Implementado |
| POST | `/api/auth/login` | Autenticação e geração de JWT | Pendente |

---

## Como executar

```bash
dotnet run --project src/NutriHubAuth.API
# Swagger disponível em: http://localhost:5225/swagger
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubAuth.Tests
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| Validação | FluentValidation |
| Documentação | Swagger / OpenAPI |
| Testes | xUnit |
