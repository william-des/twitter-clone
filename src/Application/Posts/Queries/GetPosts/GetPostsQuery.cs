using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetPosts
{
    public class GetPostsQuery : IRequest<IEnumerable<PostDto>>
    {
    }
}