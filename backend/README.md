# NutriHub — Backend

Backend da plataforma NutriHub composto por três microsserviços independentes, cada um com sua própria solution, banco de dados e ciclo de deploy.

---

## Microsserviços

| Serviço | Responsabilidade |
|---|---|
| [NutriHubAuth](./NutriHubAuth/README.md) | Cadastro e autenticação de usuários |
| [NutriHubPatient](./NutriHubPatient/README.md) | Gerenciamento de dados e conta do paciente |
| [NutriHubClinic](./NutriHubClinic/README.md) | Gerenciamento de nutricionistas, clínicas e seus pacientes |

---

## Arquitetura

Cada microsserviço adota a arquitetura mais adequada à sua complexidade:

| Serviço | Arquitetura |
|---|---|
| NutriHubAuth | Camadas simples (Controllers → UseCases → Repositories) |
| NutriHubPatient | Clean Architecture + DDD |
| NutriHubClinic | Clean Architecture + DDD |

### Padrões compartilhados entre os serviços

**Result Pattern** — Use Cases retornam `Result<TOutput>` em vez de lançar exceções para controle de fluxo:
```csharp
Result<TOutput>.Ok(output)
Result<TOutput>.Failure(ErrorType.NotFound, "mensagem")
```

**Input / Output por Use Case** — cada caso de uso possui classes próprias co-localizadas:
```
UseCases/NomeDoUseCase/
├── NomeDoUseCaseInput.cs
├── NomeDoUseCaseOutput.cs
├── INomeDoUseCaseUseCase.cs
└── NomeDoUseCaseUseCase.cs
```

**Regras de negócio na entidade** — o domínio protege seu próprio estado via métodos de comportamento:
```csharp
patient.UpdateAccount(name, email);
```

**HttpResponseHelper** — mapeamento centralizado de `Result<T>` para status HTTP na camada API.

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
# Auth
dotnet run --project NutriHubAuth/src/NutriHubAuth.API
# → http://localhost:5225/swagger

# Patient
dotnet run --project NutriHubPatient/src/NutriHubPatient.API
# → http://localhost:5081/swagger

# Clinic
dotnet run --project NutriHubClinic/src/NutriHubClinic.API
# → http://localhost:5249/swagger
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
| Validação | FluentValidation |
| Documentação | Swagger / OpenAPI |
| Testes | xUnit |
| ORM | Entity Framework Core (planejado) |
