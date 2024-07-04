using Chat.Abstractions;
using Chat.Data;
using Chat.Data.Repositories;
using Chat.Model;
using Chat.WebAPI.Extensions;
using Chat.WebAPI.Services;
using Chat.WebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Globalization;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddSingleton<PasswordService>();
builder.Services.AddData();
builder.Services.AddJwtConfigs(builder.Configuration);

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

#region Endpoints Chat
app.MapPost("/api/send", [Authorize] async (MessageViewModel messageViewModel, IMessageRepository messageRepository, HttpContext context) =>
{
    await messageRepository.SaveAsync(new Message
    {
        Id = Guid.NewGuid(),
        ReceiveAt = DateTime.Now,
        SourceUserId = GetUserId(context),
        TargetUserId = messageViewModel.TargetUserId,
        Text = messageViewModel.Text
    });
    return Results.Ok();
})
.WithName("SendNewMenssage")
.WithOpenApi();

app.MapGet("/api/messages/{targetUserId}/{dateTimeOfLastMessage}", [Authorize] async (Guid targetUserId, string dateTimeOfLastMessage, IMessageRepository messageRepository, HttpContext context) =>
{
    try
    {
        var messagens = await messageRepository.GetMessageAsync(GetUserId(context), targetUserId, DateTime.Parse(dateTimeOfLastMessage));
        return Results.Ok(messagens);
    }
    catch (Exception)
    {
        return Results.BadRequest();
    }
})
.WithName("GetMenssages")
.WithOpenApi();
#endregion

#region Endpoints Autenticação
app.MapPost("/api/login", async (LoginViewModel loginViewModel,
    IUserRepository userRepository,
    PasswordService passwordService,
    TokenService tokenService) =>
{
    try
    {
        var (Id, Hash) = await userRepository.GetUserHashAsync(loginViewModel.Email);
        if (passwordService.VerifyPassword(loginViewModel.Email, Hash, loginViewModel.Password))
        {
            var token = tokenService.GenerateToken(Id.ToString());
            return Results.Ok(new { JwtToken = token });
        }
        else
            return Results.Unauthorized();
    }
    catch (Exception)
    {
        return Results.BadRequest();
    }
})
.WithName("Login")
.WithOpenApi();
#endregion

app.Run();


Guid GetUserId(HttpContext httpContext)
{
    var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    return userId is null ? throw new Exception("Claim NameIdentifier Not Found!") : Guid.Parse(userId);
}