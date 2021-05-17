using MediatR;

namespace TwitterClone.Application.Follows.Queries.GetUserFollows
{
    public class GetUserFollowsQuery : IRequest<FollowsVM>
    {
        public int UserId { get; set; }
    }
}