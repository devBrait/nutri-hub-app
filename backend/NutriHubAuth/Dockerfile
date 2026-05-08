FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY NutriHubAuth.slnx .
COPY src/NutriHubAuth.API/NutriHubAuth.API.csproj src/NutriHubAuth.API/
COPY tests/NutriHubAuth.Tests/NutriHubAuth.Tests.csproj tests/NutriHubAuth.Tests/

RUN dotnet restore NutriHubAuth.slnx

COPY . .

RUN dotnet publish src/NutriHubAuth.API/NutriHubAuth.API.csproj \
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

ENTRYPOINT ["dotnet", "NutriHubAuth.API.dll"]
