using FluentValidation;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.Validators;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IValidator<GetPatientsByNutritionistInput>, GetPatientsByNutritionistValidator>();
builder.Services.AddScoped<IGetPatientsByNutritionistUseCase, GetPatientsByNutritionistUseCase>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
