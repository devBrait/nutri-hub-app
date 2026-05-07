# NutriHubClinic

Microsserviço responsável pelo **gerenciamento de nutricionistas, vínculos com pacientes e convites** da plataforma NutriHub.

[← Voltar ao repositório principal](../../README.md)

---

## Responsabilidade

- Criação e manutenção do perfil do nutricionista (com CRN)
- Listagem de nutricionistas disponíveis para pacientes
- Envio de convites por e-mail para pacientes
- Gestão de solicitações de acompanhamento (aceitar/recusar)
- Listagem dos pacientes vinculados ao nutricionista
- Exposição de dados de pacientes para o nutricionista responsável

---

## Arquitetura

Utiliza **Clean Architecture** combinada com **Domain-Driven Design (DDD)**, necessários para suportar a complexidade das regras de negócio envolvendo vínculos, convites e permissões.

```
NutriHubClinic/
├── src/
│   ├── NutriHubClinic.Domain/          → Entidades, Value Objects, Interfaces
│   ├── NutriHubClinic.Application/     → Use Cases, Input/Output, Validators
│   ├── NutriHubClinic.Infrastructure/  → Repositórios, EF Core, serviços externos
│   └── NutriHubClinic.API/             → Controllers, HttpResponseHelper, Program.cs
└── tests/
    └── NutriHubClinic.Tests/           → Testes unitários
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

### Nutricionista

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/nutritionists` | Cria o perfil do nutricionista |
| `GET` | `/api/nutritionists` | Lista todos os nutricionistas (visível para Pacientes) |
| `PUT` | `/api/nutritionists/me/profile` | Atualiza o perfil do nutricionista autenticado |
| `GET` | `/api/nutritionists/me/patients` | Lista os pacientes vinculados |
| `GET` | `/api/nutritionists/me/invitations` | Lista os convites enviados |
| `POST` | `/api/nutritionists/me/invitations` | Envia convite por e-mail para um paciente |
| `PUT` | `/api/nutritionists/me/tracking-requests/{id}/accept` | Aceita solicitação de acompanhamento |
| `PUT` | `/api/nutritionists/me/tracking-requests/{id}/reject` | Recusa solicitação de acompanhamento |

### Paciente

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/patients` | Cria referência do paciente no serviço de clínica |
| `POST` | `/api/patients/me/tracking-requests` | Solicita acompanhamento de um nutricionista |
| `POST` | `/api/invitations/accept` | Aceita convite enviado por nutricionista via token |

---

## Padrões adotados

### Result Pattern

Todos os Use Cases retornam `Result<TOutput>`, eliminando exceções para controle de fluxo.

```csharp
Result<TOutput>.Ok(output)
Result<TOutput>.Failure(ErrorType.NotFound, "mensagem")
Result<TOutput>.Failure(ErrorType.Validation, "mensagem")
Result<TOutput>.Failure(ErrorType.InternalError, "mensagem")
```

### Input / Output por Use Case

Cada Use Case possui suas próprias classes de entrada e saída, co-localizadas:

```
UseCases/GetPatientsByNutritionist/
├── GetPatientsByNutritionistInput.cs
├── GetPatientsByNutritionistOutput.cs
├── IGetPatientsByNutritionistUseCase.cs
└── GetPatientsByNutritionistUseCase.cs
```

### HttpResponseHelper

Mapeamento centralizado de `Result<T>` para o status HTTP correto:

```csharp
return HttpResponseHelper.FromValidationResult(result);
```

| ErrorType | HTTP Status |
|---|---|
| — (sucesso) | `200 OK` / `201 Created` |
| `Validation` | `422 Unprocessable Entity` |
| `NotFound` | `404 Not Found` |
| `Conflict` | `409 Conflict` |
| `Unauthorized` | `401 Unauthorized` |
| `InternalError` | `500 Internal Server Error` |

---

## Modelos de domínio

| Entidade | Descrição |
|---|---|
| `Nutritionist` | Perfil do nutricionista com nome, email e CRN |
| `Patient` | Referência leve ao paciente vinculado ao nutricionista |
| `Invitation` | Convite por e-mail com token único e data de expiração |
| `TrackingRequest` | Solicitação de acompanhamento feita pelo paciente |

**Enums:**
- `InvitationStatus` — `Pending`, `Accepted`, `Expired`
- `TrackingRequestStatus` — `Pending`, `Accepted`, `Rejected`

---

## Como executar

```bash
dotnet run --project src/NutriHubClinic.API
# Scalar disponível em: http://localhost:5249/doc/scalar
```

## Como rodar os testes

```bash
dotnet test tests/NutriHubClinic.Tests
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
