using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetUserPosts
{
    public class GetUserPostsQuery : IRequest<IEnumerable<PostDto>>
    {
        public int UserId { get; set; }
        public int? BeforeId { get; set; } = null;
        public int? Count { get; set; } = null;
    }
}