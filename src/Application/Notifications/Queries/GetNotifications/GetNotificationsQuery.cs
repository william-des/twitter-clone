using MediatR;

namespace TwitterClone.Application.Notifications.Queries.GetNotifications
{
    public class GetNotificationsQuery : IRequest<NotificationsVM>
    {
        public int? Count { get; set; }
        public int? BeforeId { get; set; }
    }
}