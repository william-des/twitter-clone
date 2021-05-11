using System;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Domain.Common
{
    public abstract class AuditableEntity
    {
        public DateTime Created { get; set; }
        public User CreatedBy { get; set; }
        public int CreatedById { get; set; }
        public DateTime? LastModified { get; set; }
    }
}
