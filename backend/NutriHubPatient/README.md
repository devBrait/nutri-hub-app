# NutriHubPatient

Microsserviço responsável pelo **gerenciamento de dados e conta dos pacientes** da plataforma NutriHub. Centraliza o registro de refeições, acompanhamento de macronutrientes, controle de peso e cálculo de metas calóricas.

[← Voltar ao repositório principal](../../README.md)

---

## Responsabilidade

- Criação e manutenção do perfil do paciente
- Onboarding com dados físicos e objetivos nutricionais
- Registro de refeições e itens alimentares
- Cálculo e exibição do resumo diário de calorias e macros
- Histórico de peso
- Exposição de dados do paciente para nutricionistas autorizados

---

## Arquitetura

Utiliza **Clean Architecture** combinada com **Domain-Driven Design (DDD)**, mantendo as regras de negócio isoladas e independentes de infraestrutura.

```
NutriHubPatient/
├── src/
│   ├── NutriHubPatient.Domain/          → Entidades, Interfaces, Result Pattern
│   ├── NutriHubPatient.Application/     → Use Cases, Validators (Input/Output por caso de uso)
│   ├── NutriHubPatient.Infrastructure/  → Repositórios, EF Core, acesso ao banco
│   └── NutriHubPatient.API/             → Controllers, HttpResponseHelper, Program.cs
└── tests/
    └── NutriHubPatient.Tests/           → Testes unitários
```

### Responsabilidades por camada

| Camada | Responsabilidade |
|---|---|
| `.Domain` | Entidades com comportamento, regras de negócio puras, interfaces de repositório |
| `.Application` | Use Cases, classes Input/Output por caso de uso, Validators |
| `.Infrastructure` | Implementação dos repositórios, migrations, integração com banco |
| `.API` | Controllers HTTP, mapeamento de resultados, configuração de DI |

---

## Endpoints

### Paciente

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/patients` | Cria o registro do paciente após o cadastro na Auth |
| `POST` | `/api/patients/onboarding` | Salva dados do onboarding (peso, altura, objetivo, etc.) |
| `GET` | `/api/patients/profile` | Retorna o perfil do paciente autenticado |
| `PUT` | `/api/patients/profile` | Atualiza os dados do perfil |
| `POST` | `/api/patients/weight` | Registra uma nova entrada de peso |

### Refeições

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/patients/daily-summary?date=YYYY-MM-DD` | Resumo diário de calorias e macros |
| `POST` | `/api/meals` | Adiciona um item alimentar a uma refeição |
| `DELETE` | `/api/meals/{id}` | Remove um item de refeição |

### Alimentos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/foods?query=nome` | Busca alimentos no banco por nome |

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

O domínio protege seu próprio estado. A entidade expõe comportamentos em vez de apenas propriedades:

```csharp
patient.UpdateAccount(name, email);
patient.CompleteOnboarding(weight, height, activityLevel, objective);
```

### HttpResponseHelper

Mapeamento centralizado de `Result<T>` para o status HTTP correto:

| ErrorType | HTTP Status |
|---|---|
| — (sucesso) | `200 OK` |
| `Validation` | `422 Unprocessable Entity` |
| `NotFound` | `404 Not Found` |
| `Conflict` | `409 Conflict` |
| `InternalError` | `500 Internal Server Error` |

---

## Modelos de domínio

| Entidade | Descrição |
|---|---|
| `Patient` | Nome, email, sexo, idade, altura, status de onboarding |
| `PatientGoal` | Objetivo (emagrecer, manter, ganhar músculo), peso-alvo, meta calórica |
| `Meal` | Refeição do dia (café, almoço, lanche, jantar) |
| `MealItem` | Item alimentar dentro de uma refeição (alimento + quantidade) |
| `Food` | Banco de alimentos com calorias, proteína, carboidrato e gordura por 100g |
| `DailySummary` | Dados nutricionais agregados de um dia |
| `WeightHistory` | Registro histórico de peso com data |

---

## Como executar

```bash
dotnet run --project src/NutriHubPatient.API
# Scalar disponível em: http://localhost:5081/doc/scalar
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubPatient.Tests
```

---

## Variáveis de ambiente

```env
ConnectionStrings__DefaultConnection=<PostgreSQL connection string>
Jwt__Secret=<mesmo segredo configurado no NutriHubAuth>
Jwt__Issuer=NutriHubAuth
Jwt__Audience=NutriHub
ASPNETCORE_ENVIRONMENT=Development
```

---

## Stack

| | |
|---|---|
| Framework | .NET 10 / ASP.NET Core |
| Banco de Dados | PostgreSQL + Entity Framework Core 10 |
| Validação | FluentValidation |
| Autenticação | JWT Bearer (validação independente) |
| Documentação | OpenAPI + Scalar UI |
| Testes | xUnit |
