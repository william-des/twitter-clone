using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using TwitterClone.Application.Common.Mappings;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Conversations.Queries.GetConversations
{
    public class ConversationDto : IMapFrom<Conversation>
    {
        public int Id { get; set; }
        public IEnumerable<ConversationUserDto> Members { get; set; }
        public MessageDto LastMessage { get; set; }

        public void Mapping(Profile profile) {
            profile.CreateMap<Conversation, ConversationDto>()
                .ForMember(dto => dto.LastMessage, opt => opt.MapFrom(c => c.Messages.OrderBy(m => m.Created).LastOrDefault()));
        }
    }
}