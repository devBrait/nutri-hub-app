# NutriHubPatient

Microsserviço responsável pelo gerenciamento de dados e conta dos pacientes na plataforma NutriHub.

---

## Arquitetura

Utiliza Clean Architecture combinada com Domain-Driven Design (DDD), mantendo regras de negócio isoladas na camada de domínio.

```
NutriHubPatient/
├── src/
│   ├── NutriHubPatient.Domain/          → Entidades, Interfaces, Result Pattern
│   ├── NutriHubPatient.Application/     → Use Cases, Validators (Input/Output por caso de uso)
│   ├── NutriHubPatient.Infrastructure/  → Repositórios, integração com banco de dados
│   └── NutriHubPatient.API/             → Controllers, HttpResponseHelper, Program.cs
└── tests/
    └── NutriHubPatient.Tests/           → Testes unitários
```

### Responsabilidades por camada

| Camada | Responsabilidade |
|---|---|
| `.Domain` | Regras de negócio puras, Entidades com comportamento, Interfaces de repositório |
| `.Application` | Use Cases, Input/Output por caso de uso, Validators |
| `.Infrastructure` | Implementação dos repositórios, integração com banco de dados |
| `.API` | Controllers, HttpResponseHelper, configuração de DI |

---

## Padrões adotados

### Result Pattern
Todos os Use Cases retornam `Result<TOutput>`, eliminando o uso de exceções para controle de fluxo.

```csharp
Result<TOutput>.Ok(output)
Result<TOutput>.Failure(ErrorType.Validation, "mensagem")
Result<TOutput>.Failure(ErrorType.NotFound, "mensagem")
Result<TOutput>.Failure(ErrorType.InternalError, "mensagem")
```

### Input / Output por Use Case
Cada Use Case possui suas próprias classes co-localizadas na mesma pasta:

```
UseCases/UpdatePatientAccount/
├── UpdatePatientAccountInput.cs
├── UpdatePatientAccountOutput.cs
├── IUpdatePatientAccountUseCase.cs
└── UpdatePatientAccountUseCase.cs
```

### Regras de negócio na entidade
O domínio é responsável por proteger seu próprio estado. A entidade expõe comportamentos em vez de apenas dados:

```csharp
patient.UpdateAccount(name, email); // regra executada na entidade
```

### HttpResponseHelper
Mapeamento centralizado de `Result<T>` para o status HTTP correto:

| ErrorType | HTTP Status |
|---|---|
| — (sucesso) | 200 OK |
| `Validation` | 422 Unprocessable Entity |
| `NotFound` | 404 Not Found |
| `InternalError` | 500 Internal Server Error |

---

## Como executar

```bash
dotnet run --project src/NutriHubPatient.API
# Swagger disponível em: http://localhost:5081/swagger
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubPatient.Tests
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| Validação | FluentValidation |
| Documentação | Swagger / OpenAPI |
| Testes | xUnit |
