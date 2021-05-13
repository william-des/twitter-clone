using System;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Media : AuditableEntity
    {
        public Guid Id { get; set; }
        public byte[] Content { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
    }
}