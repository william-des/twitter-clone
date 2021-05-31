using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Follows.Queries.GetFollowSuggestions
{
    public class GetFollowSuggestionsQueryHandler : IRequestHandler<GetFollowSuggestionsQuery, IEnumerable<SuggestionUserDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public GetFollowSuggestionsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUser, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<IEnumerable<SuggestionUserDto>> Handle(GetFollowSuggestionsQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if(user == null)
                throw new ForbiddenAccessException();

            var requestedCount = request.Count ?? 10;

            var notFollowed = _context.DomainUsers.Where(u => u.Id != user.Id && !u.Followers.Any(f => f.FollowerId == user.Id));
            var notFollowedCount = await notFollowed.CountAsync(cancellationToken);

            var randomSkip = notFollowedCount > requestedCount ? new Random().Next(notFollowedCount - requestedCount) : 0;

            return await notFollowed.Skip(randomSkip)
                .Take(requestedCount)
                .ProjectTo<SuggestionUserDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}