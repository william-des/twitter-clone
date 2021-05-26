using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Posts.Queries.GetPostAnswers
{
    public class GetPostAnswersQuery : IRequest<IEnumerable<PostDto>>
    {
        public int PostId { get; set; }
        public int? BeforeId { get; set; } = null;
        public int? Count { get; set; } = null;
    }
}