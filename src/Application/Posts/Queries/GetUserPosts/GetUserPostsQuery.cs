using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetUserPosts
{
    public class GetUserPostsQuery : IRequest<IEnumerable<PostDto>>
    {
        public int Id { get; set; }
    }
}