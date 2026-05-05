using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NutriHubClinic.API.Extensions;
using NutriHubClinic.Application.UseCases.AcceptInvitation;
using NutriHubClinic.Application.UseCases.CreateNutritionist;
using NutriHubClinic.Application.UseCases.GetMyInvitations;
using NutriHubClinic.Application.UseCases.GetMyPatients;
using NutriHubClinic.Application.UseCases.GetNutritionists;
using NutriHubClinic.Application.UseCases.GetPatientsByNutritionist;
using NutriHubClinic.Application.UseCases.InvitePatient;
using NutriHubClinic.Application.UseCases.UpdateNutritionistProfile;
using NutriHubClinic.Application.Validators;
using NutriHubClinic.Domain.Interfaces;
using NutriHubClinic.Infrastructure.Data;
using NutriHubClinic.Infrastructure.Repositories;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter()));
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

// Repositories
builder.Services.AddScoped<INutritionistRepository, NutritionistRepository>();
builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IInvitationRepository, InvitationRepository>();

// Use cases
builder.Services.AddScoped<IValidator<CreateNutritionistInput>, CreateNutritionistValidator>();
builder.Services.AddScoped<ICreateNutritionistUseCase, CreateNutritionistUseCase>();
builder.Services.AddScoped<IValidator<GetPatientsByNutritionistInput>, GetPatientsByNutritionistValidator>();
builder.Services.AddScoped<IGetPatientsByNutritionistUseCase, GetPatientsByNutritionistUseCase>();
builder.Services.AddScoped<IGetNutritionistsUseCase, GetNutritionistsUseCase>();
builder.Services.AddScoped<IGetMyPatientsUseCase, GetMyPatientsUseCase>();
builder.Services.AddScoped<IGetMyInvitationsUseCase, GetMyInvitationsUseCase>();
builder.Services.AddScoped<IValidator<InvitePatientInput>, InvitePatientValidator>();
builder.Services.AddScoped<IInvitePatientUseCase, InvitePatientUseCase>();
builder.Services.AddScoped<IAcceptInvitationUseCase, AcceptInvitationUseCase>();
builder.Services.AddScoped<IValidator<UpdateNutritionistProfileInput>, UpdateNutritionistProfileValidator>();
builder.Services.AddScoped<IUpdateNutritionistProfileUseCase, UpdateNutritionistProfileUseCase>();

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
