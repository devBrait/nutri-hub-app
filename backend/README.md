# NutriHub — Backend

Backend da plataforma NutriHub composto por três microsserviços independentes, cada um com sua própria solution, banco de dados PostgreSQL e ciclo de deploy.

[← Voltar ao repositório principal](../README.md)

---

## Microsserviços

| Serviço | Responsabilidade | Porta Local | Documentação |
|---|---|---|---|
| [NutriHubAuth](./NutriHubAuth/README.md) | Cadastro e autenticação de usuários | `5225` | `http://localhost:5225/doc/scalar` |
| [NutriHubPatient](./NutriHubPatient/README.md) | Gerenciamento de dados e conta do paciente | `5081` | `http://localhost:5081/doc/scalar` |
| [NutriHubClinic](./NutriHubClinic/README.md) | Nutricionistas, vínculos e convites | `5249` | `http://localhost:5249/doc/scalar` |

---

## Arquitetura

Cada microsserviço adota a arquitetura mais adequada à sua complexidade:

| Serviço | Arquitetura |
|---|---|
| NutriHubAuth | Camadas simples (Controllers → UseCases → Repositories) |
| NutriHubPatient | Clean Architecture + DDD |
| NutriHubClinic | Clean Architecture + DDD |

---

## Padrões compartilhados

### Result Pattern

Todos os Use Cases retornam `Result<TOutput>` em vez de lançar exceções para controle de fluxo:

```csharp
Result<TOutput>.Ok(output)
Result<TOutput>.Failure(ErrorType.Validation, "mensagem")
Result<TOutput>.Failure(ErrorType.NotFound, "mensagem")
Result<TOutput>.Failure(ErrorType.InternalError, "mensagem")
```

### Input / Output por Use Case

Cada caso de uso possui suas próprias classes co-localizadas na mesma pasta:

```
UseCases/NomeDoUseCase/
├── NomeDoUseCaseInput.cs
├── NomeDoUseCaseOutput.cs
├── INomeDoUseCaseUseCase.cs
└── NomeDoUseCaseUseCase.cs
```

### Regras de negócio na entidade

O domínio protege seu próprio estado via métodos de comportamento:

```csharp
patient.UpdateAccount(name, email);
patient.CompleteOnboarding(weight, height, activityLevel, objective);
```

### HttpResponseHelper

Mapeamento centralizado de `Result<T>` para status HTTP na camada API:

| ErrorType | HTTP Status |
|---|---|
| — (sucesso) | `200 OK` / `201 Created` |
| `Validation` | `422 Unprocessable Entity` |
| `NotFound` | `404 Not Found` |
| `Conflict` | `409 Conflict` |
| `Unauthorized` | `401 Unauthorized` |
| `InternalError` | `500 Internal Server Error` |

---

## Estrutura de pastas

```
backend/
├── NutriHubAuth/
│   ├── src/
│   │   └── NutriHubAuth.API/
│   └── tests/
│       └── NutriHubAuth.Tests/
│
├── NutriHubPatient/
│   ├── src/
│   │   ├── NutriHubPatient.Domain/
│   │   ├── NutriHubPatient.Application/
│   │   ├── NutriHubPatient.Infrastructure/
│   │   └── NutriHubPatient.API/
│   └── tests/
│       └── NutriHubPatient.Tests/
│
└── NutriHubClinic/
    ├── src/
    │   ├── NutriHubClinic.Domain/
    │   ├── NutriHubClinic.Application/
    │   ├── NutriHubClinic.Infrastructure/
    │   └── NutriHubClinic.API/
    └── tests/
        └── NutriHubClinic.Tests/
```

---

## Como executar todos os serviços

```bash
# Auth → http://localhost:5225/doc/scalar
dotnet run --project NutriHubAuth/src/NutriHubAuth.API

# Patient → http://localhost:5081/doc/scalar
dotnet run --project NutriHubPatient/src/NutriHubPatient.API

# Clinic → http://localhost:5249/doc/scalar
dotnet run --project NutriHubClinic/src/NutriHubClinic.API
```

## Como rodar todos os testes

```bash
dotnet test NutriHubAuth/tests/NutriHubAuth.Tests
dotnet test NutriHubPatient/tests/NutriHubPatient.Tests
dotnet test NutriHubClinic/tests/NutriHubClinic.Tests
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| ORM | Entity Framework Core 10 |
| Banco de Dados | PostgreSQL |
| Validação | FluentValidation |
| Documentação | OpenAPI + Scalar UI |
| Testes | xUnit |
