using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Extensions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Queries.GetPosts
{
    public class GetPostsQueryHandler : IRequestHandler<GetPostsQuery, IEnumerable<PostDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public GetPostsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PostDto>> Handle(GetPostsQuery request, CancellationToken cancellationToken)
        {
            var postsQuery = _context.Posts.AsQueryable();

            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if(user != null)
                postsQuery = postsQuery.Where(Post.AuthorFollowedBy(user.Id).Or(Post.LikedBySomeoneFollowedBy(user.Id).Or(p => p.CreatedById == user.Id)));

            var posts = await postsQuery.OrderByDescending(p => p.Created)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { userId = user?.Id ?? 0})
                .ToListAsync(cancellationToken);

            return posts;
        }
    }
}