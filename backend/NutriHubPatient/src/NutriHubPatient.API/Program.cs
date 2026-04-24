using FluentValidation;
using Microsoft.EntityFrameworkCore;
using NutriHubPatient.Application.UseCases.UpdatePatientAccount;
using NutriHubPatient.Application.Validators;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;
using NutriHubPatient.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<PatientDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IValidator<UpdatePatientAccountInput>, UpdatePatientAccountValidator>();
builder.Services.AddScoped<IUpdatePatientAccountUseCase, UpdatePatientAccountUseCase>();

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
