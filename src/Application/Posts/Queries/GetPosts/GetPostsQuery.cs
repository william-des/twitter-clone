using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetPosts
{
    public class GetPostsQuery : IRequest<IEnumerable<PostDto>>
    {
        public int? BeforeId { get; set; } = null;
        public int? Count { get; set; } = null;
    }
}