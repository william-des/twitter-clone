using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Users.Queries.UserSearch
{
    public class UserSearchQuery : IRequest<IEnumerable<UserDto>>
    {
        public string Search { get; set; }
    }
}