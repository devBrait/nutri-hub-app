using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NutriHubAuth.API.Controllers;
using NutriHubAuth.API.Models.Enums;
using NutriHubAuth.API.Models.Requests;
using NutriHubAuth.API.Models.Responses;
using NutriHubAuth.API.UseCases.Login;
using NutriHubAuth.API.UseCases.Logout;
using NutriHubAuth.API.UseCases.Register;
using System.Security.Claims;

namespace NutriHubAuth.Tests.Controllers;

public class AuthControllerTests
{
    private static AuthController CreateController(
        Mock<IRegisterUseCase<AuthRequest, AuthResponse>>? registerUseCase = null,
        Mock<ILoginUseCase>? loginUseCase = null,
        Mock<ILogoutUseCase>? logoutUseCase = null,
        ClaimsPrincipal? user = null)
    {
        registerUseCase ??= new Mock<IRegisterUseCase<AuthRequest, AuthResponse>>();
        loginUseCase ??= new Mock<ILoginUseCase>();
        logoutUseCase ??= new Mock<ILogoutUseCase>();

        var controller = new AuthController(registerUseCase.Object, loginUseCase.Object, logoutUseCase.Object);
        controller.ControllerContext = new ControllerContext
        {
            HttpContext = new DefaultHttpContext { User = user ?? new ClaimsPrincipal() }
        };

        return controller;
    }

    // Register

    [Fact]
    public async Task Register_ShouldReturn200_WhenUseCaseSucceeds()
    {
        var response = new AuthResponse { Success = true, UserId = Guid.NewGuid(), Role = UserRoles.Patient };
        var registerUseCase = new Mock<IRegisterUseCase<AuthRequest, AuthResponse>>();
        registerUseCase.Setup(u => u.ExecuteAsync(It.IsAny<AuthRequest>())).ReturnsAsync(response);
        var controller = CreateController(registerUseCase: registerUseCase);

        var result = await controller.Register(new AuthRequest());

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(response, ok.Value);
    }

    [Fact]
    public async Task Register_ShouldReturn400_WhenUseCaseFails()
    {
        var response = new AuthResponse { Success = false, Errors = ["Email already registered."] };
        var registerUseCase = new Mock<IRegisterUseCase<AuthRequest, AuthResponse>>();
        registerUseCase.Setup(u => u.ExecuteAsync(It.IsAny<AuthRequest>())).ReturnsAsync(response);
        var controller = CreateController(registerUseCase: registerUseCase);

        var result = await controller.Register(new AuthRequest());

        var bad = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal(response, bad.Value);
    }

    // Login

    [Fact]
    public async Task Login_ShouldReturn200_WhenUseCaseSucceeds()
    {
        var response = new LoginResponse { Success = true, AccessToken = "token", RefreshToken = "refresh" };
        var loginUseCase = new Mock<ILoginUseCase>();
        loginUseCase.Setup(u => u.ExecuteAsync(It.IsAny<LoginRequest>())).ReturnsAsync(response);
        var controller = CreateController(loginUseCase: loginUseCase);

        var result = await controller.Login(new LoginRequest());

        var ok = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(response, ok.Value);
    }

    [Fact]
    public async Task Login_ShouldReturn401_WhenUseCaseFails()
    {
        var response = new LoginResponse { Success = false, Errors = ["Invalid email or password."] };
        var loginUseCase = new Mock<ILoginUseCase>();
        loginUseCase.Setup(u => u.ExecuteAsync(It.IsAny<LoginRequest>())).ReturnsAsync(response);
        var controller = CreateController(loginUseCase: loginUseCase);

        var result = await controller.Login(new LoginRequest());

        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal(response, unauthorized.Value);
    }

    // Logout

    [Fact]
    public async Task Logout_ShouldReturn204_WhenUserIsAuthenticated()
    {
        var userId = Guid.NewGuid();
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, userId.ToString()) };
        var principal = new ClaimsPrincipal(new ClaimsIdentity(claims));
        var logoutUseCase = new Mock<ILogoutUseCase>();
        logoutUseCase.Setup(u => u.ExecuteAsync(userId)).Returns(Task.CompletedTask);
        var controller = CreateController(logoutUseCase: logoutUseCase, user: principal);

        var result = await controller.Logout();

        Assert.IsType<NoContentResult>(result);
        logoutUseCase.Verify(u => u.ExecuteAsync(userId), Times.Once);
    }

    [Fact]
    public async Task Logout_ShouldReturn401_WhenNoUserClaim()
    {
        var controller = CreateController(user: new ClaimsPrincipal());

        var result = await controller.Logout();

        Assert.IsType<UnauthorizedResult>(result);
    }

    [Fact]
    public async Task Logout_ShouldReturn401_WhenUserIdIsInvalidGuid()
    {
        var claims = new[] { new Claim(ClaimTypes.NameIdentifier, "not-a-guid") };
        var principal = new ClaimsPrincipal(new ClaimsIdentity(claims));
        var controller = CreateController(user: principal);

        var result = await controller.Logout();

        Assert.IsType<UnauthorizedResult>(result);
    }
}
