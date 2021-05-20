using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.RePosts.Commands.CreateRePost;
using TwitterClone.Application.RePosts.Commands.RemoveRePost;

namespace TwitterClone.WebUI.Controllers
{
    public class RePostsController : ApiControllerBase
    {
        [HttpPost("~/posts/{postId}/re-post")]
        public async Task CreateRePost(int postId) {
            var command = new CreateRePostCommand { PostId = postId };

            await Mediator.Send(command);
        }

        [HttpDelete("~/posts/{postId}/re-post")]
        public async Task RemoveRePost(int postId) {
            var command = new RemoveRePostCommand { PostId = postId };

            await Mediator.Send(command);
        }
    }
}