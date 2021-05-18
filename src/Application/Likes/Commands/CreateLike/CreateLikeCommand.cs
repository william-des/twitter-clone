using MediatR;

namespace TwitterClone.Application.Posts.Commands.CreateLike
{
    public class CreateLikeCommand : IRequest
    {
        public int PostId { get; set; }
    }
}