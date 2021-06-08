using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Notification : AuthorAuditableEntity
    {
        public int Id { get; set; }
        public User ForUser { get; set; }
        public int ForUserId { get; set; }
        public Post Post { get; set; }
        public int? PostId { get; set; }
        public bool Read { get; set; }
        public NotificationType Type { get; set; }
    }
}