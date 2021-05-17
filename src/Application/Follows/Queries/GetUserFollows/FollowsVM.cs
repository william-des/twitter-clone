using System.Collections.Generic;

namespace TwitterClone.Application.Follows.Queries.GetUserFollows
{
    public class FollowsVM
    {
        public IEnumerable<int> FollowerIds { get; set; }
        public IEnumerable<int> FollowedIds { get; set; }
    }
}