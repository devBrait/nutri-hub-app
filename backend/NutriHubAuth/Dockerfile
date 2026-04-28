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
EXPOSE 8080
ENTRYPOINT ["dotnet", "NutriHubAuth.API.dll"]
