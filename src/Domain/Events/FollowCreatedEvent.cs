using TwitterClone.Domain.Common;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Domain.Events
{
    public class FollowCreatedEvent : DomainEvent
    {
        public Follow Item { get; set; }

        public FollowCreatedEvent(Follow item)
        {
            Item = item;    
        }
    }
}