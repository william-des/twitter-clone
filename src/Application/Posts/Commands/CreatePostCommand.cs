using MediatR;

namespace TwitterClone.Application.Posts.Commands
{
    public class CreatePostCommand : IRequest<int>
    {
        public string Content { get; set; }
    }
}