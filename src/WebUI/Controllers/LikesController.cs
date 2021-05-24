using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Posts.Commands.CreateLike;
using TwitterClone.Application.Posts.Commands.RemoveLike;

namespace TwitterClone.WebUI.Controllers
{
    public class LikesController : ApiControllerBase
    {
        [HttpPost("~/api/posts/{postId}/like")]
        public async Task CreateLike(int postId)
        {
            var command = new CreateLikeCommand { PostId = postId };

            await Mediator.Send(command);
        }

        [HttpDelete("~/api/posts/{postId}/like")]
        public async Task RemoveLike(int postId)
        {
            var command = new RemoveLikeCommand { PostId = postId };

            await Mediator.Send(command);
        }
    }
}