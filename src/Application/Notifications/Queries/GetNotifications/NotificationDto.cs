using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Notifications.Queries.GetNotifications
{
    public class NotificationDto : IMapFrom<Notification>
    {
        public int Id { get; set; }
        public bool Read { get; set; }
        public UserDto CreatedBy { get; set; }
        public NotificationType Type { get; set; }
    }
}