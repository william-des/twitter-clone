using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Post : AuditableEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
    }
}