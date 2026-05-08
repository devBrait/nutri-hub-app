FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY NutriHubClinic.slnx .
COPY src/NutriHubClinic.API/NutriHubClinic.API.csproj src/NutriHubClinic.API/
COPY src/NutriHubClinic.Application/NutriHubClinic.Application.csproj src/NutriHubClinic.Application/
COPY src/NutriHubClinic.Domain/NutriHubClinic.Domain.csproj src/NutriHubClinic.Domain/
COPY src/NutriHubClinic.Infrastructure/NutriHubClinic.Infrastructure.csproj src/NutriHubClinic.Infrastructure/
COPY tests/NutriHubClinic.Tests/NutriHubClinic.Tests.csproj tests/NutriHubClinic.Tests/

RUN dotnet restore NutriHubClinic.slnx

COPY . .

RUN dotnet publish src/NutriHubClinic.API/NutriHubClinic.API.csproj \
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

ENTRYPOINT ["dotnet", "NutriHubClinic.API.dll"]
