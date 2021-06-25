using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Conversations.Commands.CreateConversation;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class ConversationsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateConversationCommand command) 
        {
            return await Mediator.Send(command);
        }
    }
}