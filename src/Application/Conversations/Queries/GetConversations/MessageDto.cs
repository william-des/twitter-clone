using System;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Conversations.Queries.GetConversations
{
    public class MessageDto : IMapFrom<Message>
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string MediaId { get; set; }
        public int CreatedById { get; set; }
        public DateTime? Created { get; set; }
    }
}