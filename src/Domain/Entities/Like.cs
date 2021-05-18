using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Like : AuthorAuditableEntity
    {
        public Post Post { get; set; }
        public int PostId { get; set; }
    }
}