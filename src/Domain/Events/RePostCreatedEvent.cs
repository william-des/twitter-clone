using TwitterClone.Domain.Common;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Domain.Events
{
    public class RePostCreatedEvent : DomainEvent
    {
        public RePost Item { get; set; }

        public RePostCreatedEvent(RePost item)
        {
            Item = item;
        }
    }
}