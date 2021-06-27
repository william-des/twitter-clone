using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Conversations.Commands.CreateConversation;
using TwitterClone.Application.Conversations.Queries.GetConversations;

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

        [HttpGet]
        public async Task<IEnumerable<ConversationDto>> GetConversations()
        {
            return await Mediator.Send(new GetConversationsQuery());
        }
    }
}