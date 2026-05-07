# NutriHubAuth

Microsserviço responsável pelo **cadastro e autenticação** de usuários (Pacientes e Nutricionistas) da plataforma NutriHub.

[← Voltar ao repositório principal](../../README.md)

---

## Responsabilidade

Centraliza o controle de identidade da plataforma. Todos os demais serviços validam tokens JWT gerados por este serviço usando um segredo compartilhado via variável de ambiente.

---

## Arquitetura

Utiliza arquitetura em camadas simples, adequada a um serviço com foco único em autenticação.

```
NutriHubAuth/
├── src/
│   └── NutriHubAuth.API/
│       ├── Controllers/       → Recebe e responde requisições HTTP
│       ├── UseCases/          → Lógica de negócio (registro, login, logout)
│       ├── Repositories/      → Acesso ao banco de dados
│       ├── Models/            → Entidades, DTOs e Enums
│       └── Validators/        → Regras de validação com FluentValidation
└── tests/
    └── NutriHubAuth.Tests/    → Testes unitários
```

---

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/auth/register` | Cadastro de novo usuário (Paciente ou Nutricionista) |
| `POST` | `/api/auth/login` | Autenticação e geração de JWT + refresh token |
| `POST` | `/api/auth/logout` | Logout e revogação do refresh token |

### Exemplo — Registro

```json
POST /api/auth/register
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "Senha@123",
  "role": "Patient"
}
```

### Exemplo — Login

```json
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "Senha@123"
}
```

**Resposta:**
```json
{
  "success": true,
  "output": {
    "accessToken": "eyJhbGci...",
    "refreshToken": "abc123..."
  }
}
```

---

## Padrão de Resposta

Todas as respostas seguem o envelope padrão da plataforma:

```json
{
  "success": true | false,
  "message": "string | null",
  "output": {},
  "errors": []
}
```

| Situação | HTTP Status |
|---|---|
| Sucesso | `200 OK` / `201 Created` |
| Erro de validação | `422 Unprocessable Entity` |
| Não autorizado | `401 Unauthorized` |
| Conflito (e-mail duplicado) | `409 Conflict` |
| Erro interno | `500 Internal Server Error` |

---

## Como executar

```bash
dotnet run --project src/NutriHubAuth.API
# Documentação disponível em: http://localhost:5225/scalar/v1
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubAuth.Tests
```

---

## Variáveis de ambiente

```env
ConnectionStrings__DefaultConnection=<PostgreSQL connection string>
Jwt__Secret=<string aleatória com 32+ caracteres>
Jwt__Issuer=NutriHubAuth
Jwt__Audience=NutriHub
Jwt__ExpiresInMinutes=60
ASPNETCORE_ENVIRONMENT=Development
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| Banco de Dados | PostgreSQL + Entity Framework Core 10 |
| Validação | FluentValidation |
| Autenticação | JWT (HS256) |
| Documentação | OpenAPI + Scalar UI |
| Testes | xUnit |
