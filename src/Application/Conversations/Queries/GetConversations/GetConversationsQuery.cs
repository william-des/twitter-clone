using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Conversations.Queries.GetConversations
{
    public class GetConversationsQuery : IRequest<IEnumerable<ConversationDto>>
    {
        
    }
}