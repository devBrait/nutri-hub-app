FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY NutriHubPatient.slnx .
COPY src/NutriHubPatient.API/NutriHubPatient.API.csproj src/NutriHubPatient.API/
COPY src/NutriHubPatient.Application/NutriHubPatient.Application.csproj src/NutriHubPatient.Application/
COPY src/NutriHubPatient.Domain/NutriHubPatient.Domain.csproj src/NutriHubPatient.Domain/
COPY src/NutriHubPatient.Infrastructure/NutriHubPatient.Infrastructure.csproj src/NutriHubPatient.Infrastructure/
COPY tests/NutriHubPatient.Tests/NutriHubPatient.Tests.csproj tests/NutriHubPatient.Tests/

RUN dotnet restore NutriHubPatient.slnx

COPY . .

RUN dotnet publish src/NutriHubPatient.API/NutriHubPatient.API.csproj \
    --configuration Release \
    --no-restore \
    --output /publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /publish .

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "NutriHubPatient.API.dll"]
