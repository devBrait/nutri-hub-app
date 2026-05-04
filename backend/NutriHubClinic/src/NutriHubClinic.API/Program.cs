using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NutriHubClinic.API.Extensions;
using NutriHubClinic.Application.UseCases.CreateNutritionist;
using NutriHubClinic.Application.UseCases.GetNutritionists;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.Validators;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;
using NutriHubClinic.Infrastructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});

builder.Services.AddDbContext<ClinicDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var jwtSecret = builder.Configuration["Jwt:Secret"]!;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret))
        };
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddScoped<INutritionistRepository, NutritionistRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IValidator<CreateNutritionistInput>, CreateNutritionistValidator>();
builder.Services.AddScoped<ICreateNutritionistUseCase, CreateNutritionistUseCase>();
builder.Services.AddScoped<IValidator<GetPatientsByNutritionistInput>, GetPatientsByNutritionistValidator>();
builder.Services.AddScoped<IGetPatientsByNutritionistUseCase, GetPatientsByNutritionistUseCase>();
builder.Services.AddScoped<IGetNutritionistsUseCase, GetNutritionistsUseCase>();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ClinicDbContext>();
    db.Database.Migrate();
}

app.MapOpenApi();
app.MapScalar();

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
