using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Conversations.Queries.GetConversations
{
    public class GetConversationsQueryHandler : IRequestHandler<GetConversationsQuery, IEnumerable<ConversationDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public GetConversationsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<IEnumerable<ConversationDto>> Handle(GetConversationsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Conversations
                .Where(c => c.Members.Any(m => m.ApplicationUserId == _currentUser.UserId))
                .ProjectTo<ConversationDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(c => c.LastMessage.Created)
                .ToListAsync(cancellationToken);
        }
    }
}