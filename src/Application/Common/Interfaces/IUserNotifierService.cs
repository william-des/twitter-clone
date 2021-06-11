
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Common.Interfaces
{
    public interface IUserNotifierService
    {
        void SendNotification(Notification notification);
    }
}