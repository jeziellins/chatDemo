using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Chat.WebAPI.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        
    }
}
