
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Common.Security;
using TwitterClone.Application.Notifications.Commands.MarkNotificationAsRead;
using TwitterClone.Application.Notifications.Queries.GetNotifications;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class NotificationsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<NotificationsVM> Get([FromQuery] GetNotificationsQuery query) {
            return await Mediator.Send(query);
        }

        [HttpPost("{id}/read")]
        public async Task MarkAsRead(int id) {
            await Mediator.Send(new MarkNotificationAsReadCommand { Id  = id});
        }
    }
}