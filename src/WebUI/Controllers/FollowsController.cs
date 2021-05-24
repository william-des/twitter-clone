using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Follows.Commands.FollowUserCommand;
using TwitterClone.Application.Follows.Commands.UnfollowUserCommand;
using TwitterClone.Application.Follows.Queries.GetUserFollows;

namespace TwitterClone.WebUI.Controllers
{
    public class FollowsController : ApiControllerBase
    {
        [HttpGet("~/api/users/{userId}/follows")]
        public async Task<FollowsVM> GetUserFollows(int userId)
        {
            var query = new GetUserFollowsQuery { UserId = userId };

            return await Mediator.Send(query);
        }

        [HttpPost("~/api/users/{userId}/follow")]
        public async Task<ActionResult> FollowUser(int userId)
        {
            var command = new FollowUserCommand { UserId = userId };

            await Mediator.Send(command);

            return Ok();
        }

        [HttpPost("~/api/users/{userId}/unfollow")]
        public async Task<ActionResult> UnfollowUser(int userId)
        {
            var command = new UnfollowUserCommand { UserId = userId };

            await Mediator.Send(command);

            return Ok();
        }
    }
}