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
            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);
            var postsQuery = _context.Posts.AsNoTracking().Where(p => !p.AnswerToId.HasValue);

            if(user != null)
                postsQuery = postsQuery.Where(Post.AuthorFollowedBy(user.Id)
                    .Or(Post.LikedBySomeoneFollowedBy(user.Id)
                    .Or(Post.RePostedBySomeoneFollowedBy(user.Id))
                    .Or(p => p.CreatedById == user.Id)));

            if(request.BeforeId.HasValue)
                postsQuery = postsQuery.Where(p => p.Id < request.BeforeId);

            return await postsQuery.OrderByDescending(p => p.Created)
                .Take(request.Count ?? 20)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { userId = user?.Id ?? 0})
                .ToListAsync(cancellationToken);
        }
    }
}