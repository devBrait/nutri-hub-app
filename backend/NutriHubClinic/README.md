# NutriHubClinic

Microsserviço responsável pelo gerenciamento de nutricionistas, clínicas e seus respectivos pacientes na plataforma NutriHub.

---

## Arquitetura

Utiliza Clean Architecture combinada com Domain-Driven Design (DDD), devido à alta complexidade das regras de negócio envolvendo clínicas e nutricionistas.

```
NutriHubClinic/
├── src/
│   ├── NutriHubClinic.Domain/          → Entidades, Value Objects, Interfaces
│   ├── NutriHubClinic.Application/     → Use Cases, DTOs, Validators
│   ├── NutriHubClinic.Infrastructure/  → Repositórios, EF Core, Serviços externos
│   └── NutriHubClinic.API/             → Controllers, Helpers, Program.cs
└── tests/
    └── NutriHubClinic.Tests/           → Testes unitários
```

### Responsabilidades por camada

| Camada | Responsabilidade |
|---|---|
| `.Domain` | Regras de negócio puras, Entidades, Interfaces de repositório |
| `.Application` | Use Cases, Input/Output por caso de uso, Validators |
| `.Infrastructure` | Implementação dos repositórios, integração com banco de dados |
| `.API` | Controllers, HttpResponseHelper, configuração de DI |

---

## Padrões adotados

### Result Pattern
Todos os Use Cases retornam `Result<TOutput>`, encapsulando sucesso ou falha sem uso de exceções para controle de fluxo.

```csharp
Result<TOutput>.Ok(output)
Result<TOutput>.Failure(ErrorType.NotFound, "mensagem")
Result<TOutput>.Failure(ErrorType.Validation, "mensagem")
Result<TOutput>.Failure(ErrorType.InternalError, "mensagem")
```

### Input / Output por Use Case
Cada Use Case possui suas próprias classes de entrada e saída, co-localizadas na mesma pasta:

```
UseCases/GetPatientsByNutritionist/
├── GetPatientsByNutritionistInput.cs
├── GetPatientsByNutritionistOutput.cs
├── IGetPatientsByNutritionistUseCase.cs
└── GetPatientsByNutritionistUseCase.cs
```

### HttpResponseHelper
Mapeamento centralizado de `Result<T>` para o status HTTP correto na camada API:

```csharp
return HttpResponseHelper.FromValidationResult(result);
```

---

## Como executar

```bash
dotnet run --project src/NutriHubClinic.API
# Swagger disponível em: http://localhost:5249/swagger
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubClinic.Tests
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| Validação | FluentValidation |
| Documentação | Swagger / OpenAPI |
| Testes | xUnit |
