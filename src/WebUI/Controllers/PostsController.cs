using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Common.Security;
using TwitterClone.Application.Posts.Commands;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class PostsController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePostCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}