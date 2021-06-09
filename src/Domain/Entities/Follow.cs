using System.Collections.Generic;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Follow : IHasDomainEvent
    {
        public User Follower { get; set; }
        public int FollowerId { get; set; }
        public User Followed { get; set; }
        public int FollowedId { get; set; }
        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}