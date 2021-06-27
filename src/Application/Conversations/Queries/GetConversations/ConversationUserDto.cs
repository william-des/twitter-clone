using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Conversations.Queries.GetConversations
{
    public class ConversationUserDto : IMapFrom<User>
    {
         public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string PictureId { get; set; }
        public bool IsCertified { get; set; }
    }
}