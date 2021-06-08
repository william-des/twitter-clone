using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Users.Queries.UserSearch
{
    public class UserSearchQueryHandler : IRequestHandler<UserSearchQuery, IEnumerable<SearchUserDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUser;

        public UserSearchQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<IEnumerable<SearchUserDto>> Handle(UserSearchQuery request, CancellationToken cancellationToken)
        {
            return await _context.DomainUsers
                .Where(u => u.FullName.ToLower().Contains(request.Search.ToLower()) 
                    || u.Username.ToLower().Contains(request.Search.ToLower()))
                .OrderByDescending(u => u.Username.ToLower() == request.Search.ToLower())
                .ThenByDescending(u => u.Followers.Any(d => d.Follower.ApplicationUserId == _currentUser.UserId))
                .ProjectTo<SearchUserDto>(_mapper.ConfigurationProvider, new { applicationUserId = _currentUser.UserId })
                .Take(10)
                .ToListAsync(cancellationToken);
        }
    }
}