using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Common.Security;
using TwitterClone.Application.Posts.Commands.CreatePost;
using TwitterClone.Application.Posts.Queries.GetPosts;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class PostsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<PostDto>> Get() {
            return await Mediator.Send(new GetPostsQuery());
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePostCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}