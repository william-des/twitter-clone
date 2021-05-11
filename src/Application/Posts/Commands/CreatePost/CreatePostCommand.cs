using MediatR;

namespace TwitterClone.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommand : IRequest<int>
    {
        public string Content { get; set; }
    }
}