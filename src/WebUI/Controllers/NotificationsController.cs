
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Common.Security;
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
    }
}