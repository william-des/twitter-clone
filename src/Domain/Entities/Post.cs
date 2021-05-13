using System;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Post : AuthorAuditableEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public Guid? MediaId { get; set; }
        public Media Media { get; set; }
    }
}