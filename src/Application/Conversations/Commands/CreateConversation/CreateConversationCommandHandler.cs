using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Conversations.Commands.CreateConversation
{
    public class CreateConversationCommandHandler : IRequestHandler<CreateConversationCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public CreateConversationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
            _context = context;
        }

        public async Task<int> Handle(CreateConversationCommand request, CancellationToken cancellationToken)
        {
            var members = await _context.DomainUsers
                .Where(u => request.Members.Any(id => id == u.Id) || u.ApplicationUserId == _currentUser.UserId)
                .ToListAsync(cancellationToken);
            
            var notFounds = request.Members.Where(id => !members.Any(found => found.Id == id)).ToList();
            if(notFounds.Any())
                throw new NotFoundException(nameof(User), string.Join(", ", notFounds));

            var conversation = new Conversation
            {
                Members = members
            };

            _context.Conversations.Add(conversation);
            await _context.SaveChangesAsync(cancellationToken);

            return conversation.Id;
        }
    }
}