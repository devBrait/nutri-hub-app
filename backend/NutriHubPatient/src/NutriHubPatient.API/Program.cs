using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NutriHubPatient.API.Extensions;
using NutriHubPatient.Application.UseCases.AddMealItem;
using NutriHubPatient.Application.UseCases.CreatePatient;
using NutriHubPatient.Application.UseCases.DeleteMealItem;
using NutriHubPatient.Application.UseCases.DeleteWeightHistory;
using NutriHubPatient.Application.UseCases.GetDailySummary;
using NutriHubPatient.Application.UseCases.GetFoods;
using NutriHubPatient.Application.UseCases.GetMealItems;
using NutriHubPatient.Application.UseCases.GetPatientProfile;
using NutriHubPatient.Application.UseCases.LogWeight;
using NutriHubPatient.Application.UseCases.SaveOnboarding;
using NutriHubPatient.Application.UseCases.UpdatePatientProfile;
using NutriHubPatient.Application.Validators;
using NutriHubPatient.Domain.Interfaces;
using NutriHubPatient.Infrastructure.Data;
using NutriHubPatient.Infrastructure.Repositories;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer<BearerSecuritySchemeTransformer>();
});

builder.Services.AddDbContext<PatientDbContext>(options =>
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

builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IDailySummaryRepository, DailySummaryRepository>();
builder.Services.AddScoped<IMealRepository, MealRepository>();
builder.Services.AddScoped<IFoodRepository, FoodRepository>();
builder.Services.AddScoped<IValidator<GetFoodsInput>, GetFoodsValidator>();
builder.Services.AddScoped<IGetFoodsUseCase, GetFoodsUseCase>();
builder.Services.AddScoped<IValidator<CreatePatientInput>, CreatePatientValidator>();
builder.Services.AddScoped<ICreatePatientUseCase, CreatePatientUseCase>();
builder.Services.AddScoped<IValidator<SaveOnboardingInput>, SaveOnboardingValidator>();
builder.Services.AddScoped<ISaveOnboardingUseCase, SaveOnboardingUseCase>();
builder.Services.AddScoped<IValidator<GetDailySummaryInput>, GetDailySummaryValidator>();
builder.Services.AddScoped<IGetDailySummaryUseCase, GetDailySummaryUseCase>();
builder.Services.AddScoped<IValidator<AddMealItemInput>, AddMealItemValidator>();
builder.Services.AddScoped<IAddMealItemUseCase, AddMealItemUseCase>();
builder.Services.AddScoped<IValidator<GetMealItemsInput>, GetMealItemsValidator>();
builder.Services.AddScoped<IGetMealItemsUseCase, GetMealItemsUseCase>();
builder.Services.AddScoped<IValidator<DeleteMealItemInput>, DeleteMealItemValidator>();
builder.Services.AddScoped<IDeleteMealItemUseCase, DeleteMealItemUseCase>();
builder.Services.AddScoped<IValidator<LogWeightInput>, LogWeightValidator>();
builder.Services.AddScoped<ILogWeightUseCase, LogWeightUseCase>();
builder.Services.AddScoped<IValidator<DeleteWeightHistoryInput>, DeleteWeightHistoryValidator>();
builder.Services.AddScoped<IDeleteWeightHistoryUseCase, DeleteWeightHistoryUseCase>();
builder.Services.AddScoped<IGetPatientProfileUseCase, GetPatientProfileUseCase>();
builder.Services.AddScoped<IValidator<UpdatePatientProfileInput>, UpdatePatientProfileValidator>();
builder.Services.AddScoped<IUpdatePatientProfileUseCase, UpdatePatientProfileUseCase>();
builder.Services.AddHealthChecks();

var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PatientDbContext>();
    db.Database.Migrate();
}

app.MapOpenApi();
app.MapScalar();

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
