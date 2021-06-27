using System;
using TwitterClone.Domain.Common;

namespace TwitterClone.Domain.Entities
{
    public class Message : AuthorAuditableEntity
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public Media Media { get; set; }
        public Guid? MediaId { get; set; }
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
    }
}