using System.Collections.Generic;
using TwitterClone.Application.Notifications.Queries.GetNotifications;

namespace TwitterClone.Application.Notifications.Queries.GetNotifications
{
    public class NotificationsVM
    {
        public IEnumerable<NotificationDto> Notifications { get; set; }
        public int TotalUnread { get; set; }
    }
}