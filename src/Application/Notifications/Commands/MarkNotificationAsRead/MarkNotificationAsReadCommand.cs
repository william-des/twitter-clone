using MediatR;

namespace TwitterClone.Application.Notifications.Commands.MarkNotificationAsRead
{
    public class MarkNotificationAsReadCommand : IRequest
    {
        public int Id { get; set; }
    }
}