using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Follows.Commands.FollowUserCommand;
using TwitterClone.Application.Follows.Commands.UnfollowUserCommand;
using TwitterClone.Application.Follows.Queries.GetFollowSuggestions;
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

        [HttpGet("suggestions")]
        public async Task<IEnumerable<SuggestionUserDto>> GetSuggestions(int? count)
        {
            var query = new GetFollowSuggestionsQuery { Count = count };

            return await Mediator.Send(query);
        }


        [HttpPost("~/api/users/{userId}/follows")]
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