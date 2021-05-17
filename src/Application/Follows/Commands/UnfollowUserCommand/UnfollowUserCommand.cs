using MediatR;

namespace TwitterClone.Application.Follows.Commands.UnfollowUserCommand
{
    public class UnfollowUserCommand : IRequest
    {
        public int UserId { get; set; }
    }
}