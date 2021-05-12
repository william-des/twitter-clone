using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetPost
{
    public class GetPostQuery : IRequest<PostDto>
    {
        public int Id { get; set; }
    }
}