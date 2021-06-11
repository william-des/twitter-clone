using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace TwitterClone.WebUI.Hubs
{
    [Authorize]
    public class NotificationsHub : Hub
    {
        
    }
}