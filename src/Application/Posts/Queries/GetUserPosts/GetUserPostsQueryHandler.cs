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

namespace TwitterClone.Application.Posts.Queries.GetUserPosts
{
    public class GetUserPostsQueryHandler : IRequestHandler<GetUserPostsQuery, IEnumerable<PostDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public GetUserPostsQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PostDto>> Handle(GetUserPostsQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Posts
                .AsNoTracking()
                .Where(p => !!p.AnswerToId.HasValue)
                .Where(Post.IsRePostedBy(request.UserId).Or(p => p.CreatedById == request.UserId));

            if(request.BeforeId.HasValue)
                query = query.Where(p => p.Id < request.BeforeId);

            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);

            return await query.OrderByDescending(p => p.Created)
                .Take(request.Count ?? 20)
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { userId = user?.Id ?? 0 })
                .ToListAsync(cancellationToken);
        }
    }
}