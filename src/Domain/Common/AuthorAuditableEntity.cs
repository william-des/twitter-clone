using TwitterClone.Domain.Entities;

namespace TwitterClone.Domain.Common
{
    public class AuthorAuditableEntity : AuditableEntity
    {
        public User CreatedBy { get; set; }
        public int CreatedById { get; set; }
    }
}