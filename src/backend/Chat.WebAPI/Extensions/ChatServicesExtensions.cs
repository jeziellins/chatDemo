using Chat.Abstractions;
using Chat.Data.Repositories;
using Chat.WebAPI.Hubs;
using Chat.WebAPI.Services;
using Microsoft.AspNetCore.SignalR;

namespace Chat.WebAPI.Extensions
{
    public static class ChatServicesExtensions
    {
        public static void AddChatServices(this IServiceCollection services)
        {
            services.AddSingleton<IUserIdProvider, UserIdProvider>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddSingleton<PasswordService>();
        }
    }
}
