using System.Collections.Generic;
using MediatR;

namespace TwitterClone.Application.Conversations.Commands.CreateConversation
{
    public class CreateConversationCommand : IRequest<int>
    {
        public IEnumerable<int> Members { get; set; }
    }
}