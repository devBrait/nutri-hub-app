using FluentValidation;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.Repositories;
using NutriHubAuth.API.UseCases;
using NutriHubAuth.API.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddScoped<IValidator<AuthRequest>, AuthRequestValidator>();
builder.Services.AddScoped<IAuthUseCase<AuthRequest, AuthResponse>, AuthUseCase>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
