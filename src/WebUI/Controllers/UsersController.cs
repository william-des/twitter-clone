using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TwitterClone.Application.Users.Commands.CreateUser;
using TwitterClone.Application.Users.Queries.GetUser;

namespace TwitterClone.WebUI.Controllers
{
    [Authorize]
    public class UsersController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            var query = new GetUserQuery { Id = id };

            return await Mediator.Send(query);
        }
    }
}