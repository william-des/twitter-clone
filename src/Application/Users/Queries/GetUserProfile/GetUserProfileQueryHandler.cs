using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Users.Queries.GetUserProfile
{
    public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, UserProfileVM>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetUserProfileQueryHandler(IMapper mapper, IApplicationDbContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserProfileVM> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

            if (user == null)
                throw new NotFoundException(nameof(User), request.Username);

            var followedCount =  await _context.Follows.Where(f => f.FollowerId == user.Id).CountAsync(cancellationToken);
            var followersCount =  await _context.Follows.Where(f => f.FollowedId == user.Id).CountAsync(cancellationToken);
            var postsCount =  await _context.Posts.Where(p => p.CreatedById == user.Id).CountAsync(cancellationToken);

            return new UserProfileVM 
            {
                User = user,
                FollowedCount = followedCount,
                FollowersCount = followersCount,
                PostsCount = postsCount
            };
        }
    }
}