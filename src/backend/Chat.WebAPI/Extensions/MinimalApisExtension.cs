using Chat.Abstractions;
using Chat.Model;
using Chat.WebAPI.Hubs;
using Chat.WebAPI.Services;
using Chat.WebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace Chat.WebAPI.Extensions
{
    public static class MinimalApisExtension
    {
        public static void UseMinimalApis(this IEndpointRouteBuilder endpoints)
        {
            #region Endpoints Chat
            endpoints.MapPost("/api/send", [Authorize] async (MessageViewModel messageViewModel, IMessageRepository messageRepository,
                HttpContext context,
                IHubContext<ChatHub> hubContext) =>
            {
                try
                {
                    var message = new Message
                    {
                        Id = Guid.NewGuid(),
                        ReceiveAt = DateTime.Now,
                        SourceUserId = GetUserId(context),
                        TargetUserId = messageViewModel.TargetUserId,
                        Text = messageViewModel.Text
                    };
                    await messageRepository.SaveAsync(message);
                    await hubContext.Clients.Users(message.SourceUserId.ToString(), message.TargetUserId.ToString()).SendAsync("MessageNotify", message);
                    return Results.Ok();
                }
                catch (Exception)
                {
                    return Results.BadRequest();
                }
            })
            .WithName("SendNewMenssage")
            .WithOpenApi();

            endpoints.MapGet("/api/messages/{targetUserId}/{dateTimeOfLastMessage}", [Authorize] async (Guid targetUserId, string dateTimeOfLastMessage, IMessageRepository messageRepository, HttpContext context) =>
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

            #region Endpoints Users
            endpoints.MapGet("/api/users", [Authorize] async (IUserRepository userRepository, HttpContext context) =>
            {
                try
                {
                    var users = await userRepository.GetAllUsersAsync(GetUserId(context));
                    var result = new List<UserViewModel>();
                    foreach (var user in users)
                    {
                        result.Add(new UserViewModel(user));
                    }
                    return Results.Ok(result);
                }
                catch (Exception)
                {
                    return Results.BadRequest();
                }
            })
            .WithName("GetUsers")
            .WithOpenApi();

            endpoints.MapGet("/api/user", [Authorize] async (IUserRepository userRepository, HttpContext context) =>
            {
                try
                {
                    var user = await userRepository.GetUser(GetUserId(context));
                    var result = new UserViewModel(user);
                    return Results.Ok(result);
                }
                catch (Exception)
                {
                    return Results.BadRequest();
                }
            })
            .WithName("GetUser")
            .WithOpenApi();
            #endregion

            #region Endpoints Autenticação
            endpoints.MapPost("/api/login", async (LoginViewModel loginViewModel,
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

            endpoints.MapHub<ChatHub>("/hubs/chat");

        }

        static Guid GetUserId(HttpContext httpContext)
        {
            var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return userId is null ? throw new Exception("Claim NameIdentifier Not Found!") : Guid.Parse(userId);
        }
    }
}
