using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Application.Notifications.Queries.GetNotifications;
using TwitterClone.Domain.Entities;
using TwitterClone.WebUI.Hubs;

namespace TwitterClone.WebUI.Services
{
    public class UserNotifierService : IUserNotifierService
    {
        private readonly IHubContext<NotificationsHub> _hubContext;
        private readonly IMapper _mapper;

        public UserNotifierService(IHubContext<NotificationsHub> hubContext, IMapper mapper)
        {
            _hubContext = hubContext;
            _mapper = mapper;
        }

        public void SendNotification(Notification notification)
        {
            //Prevent CS4014 warning. We don't want to wait for the notifcation to be sent in this context.
            Task _ = Task.Run(async () => {
                var dto = _mapper.Map<NotificationDto>(notification);
                await _hubContext.Clients.User(notification.ForUser.ApplicationUserId).SendAsync("Notification", dto);
            });
        }
    }
}