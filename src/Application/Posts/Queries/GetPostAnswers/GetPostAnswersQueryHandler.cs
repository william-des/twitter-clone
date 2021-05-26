using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Posts.Queries.GetPostAnswers
{
    public class GetPostAnswersQueryHandler : IRequestHandler<GetPostAnswersQuery, IEnumerable<PostDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public GetPostAnswersQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
            _mapper = mapper;
        }

        public async Task<IEnumerable<PostDto>> Handle(GetPostAnswersQuery request, CancellationToken cancellationToken)
        {
            var query = _context.Posts
                .AsNoTracking()
                .Where(p => p.AnswerToId == request.PostId);

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