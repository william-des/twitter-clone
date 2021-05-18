using MediatR;

namespace TwitterClone.Application.Posts.Commands.RemoveLike
{
    public class RemoveLikeCommand : IRequest
    {
        public int PostId { get; set; }
    }
}