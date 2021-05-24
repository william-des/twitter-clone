using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Common.Security;
using TwitterClone.Application.Posts.Commands.CreatePost;
using TwitterClone.Application.Posts.Queries.GetPost;
using TwitterClone.Application.Posts.Queries.GetPosts;
using TwitterClone.Application.Posts.Queries.GetUserPosts;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class PostsController : ApiControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<Application.Posts.Queries.GetPosts.PostDto>> Get([FromQuery] GetPostsQuery query) {
            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<Application.Posts.Queries.GetPost.PostDto> Get(int id) {
            return await Mediator.Send(new GetPostQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePostCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("~/api/users/{userId}/posts")]
        public async Task<IEnumerable<Application.Posts.Queries.GetUserPosts.PostDto>> GetUserPosts(int userId, int? beforeId, int? count)
        {
            var query = new GetUserPostsQuery { UserId = userId, BeforeId = beforeId, Count = count };

            return await Mediator.Send(query);
        }
    }
}