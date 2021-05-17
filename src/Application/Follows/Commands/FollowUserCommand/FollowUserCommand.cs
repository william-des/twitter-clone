using MediatR;

namespace TwitterClone.Application.Follows.Commands.FollowUserCommand
{
    public class FollowUserCommand : IRequest
    {
        public int UserId { get; set; }
    }
}