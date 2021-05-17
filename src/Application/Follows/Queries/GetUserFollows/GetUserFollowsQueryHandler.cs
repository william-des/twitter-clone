using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Follows.Queries.GetUserFollows
{
    public class GetUserFollowsQueryHandler : IRequestHandler<GetUserFollowsQuery, FollowsVM>
    {
        private readonly IApplicationDbContext _context;

        public GetUserFollowsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FollowsVM> Handle(GetUserFollowsQuery request, CancellationToken cancellationToken)
        {
            var follows = await _context.Follows
                .AsNoTracking()
                .Where(f => f.FollowedId == request.UserId || f.FollowerId == request.UserId)
                .ToListAsync(cancellationToken);

            return new FollowsVM {
                FollowedIds = follows.Where(f => f.FollowerId == request.UserId).Select(f => f.FollowedId),
                FollowerIds = follows.Where(f => f.FollowedId == request.UserId).Select(f => f.FollowerId)
            };
        }
    }
}