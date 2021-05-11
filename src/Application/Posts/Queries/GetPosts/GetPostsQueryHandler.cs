using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Posts.Queries.GetPosts
{
    public class GetPostsQueryHandler : IRequestHandler<GetPostsQuery, IEnumerable<PostDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetPostsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<PostDto>> Handle(GetPostsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Posts
                .AsNoTracking()
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(p => p.Created)
                .ToListAsync(cancellationToken);
        }
    }
}