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
EXPOSE 8080
ENTRYPOINT ["dotnet", "NutriHubClinic.API.dll"]
