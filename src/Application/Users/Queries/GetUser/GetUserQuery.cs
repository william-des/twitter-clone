using MediatR;

namespace TwitterClone.Application.Users.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserDto>
    {
        public int Id { get; set; }
    }
}