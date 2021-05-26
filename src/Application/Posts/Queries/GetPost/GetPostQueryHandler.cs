using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Queries.GetPost
{
    public class GetPostQueryHandler : IRequestHandler<GetPostQuery, PostDto>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public GetPostQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
            _mapper = mapper;
            _context = context;
        }

        public async Task<PostDto> Handle(GetPostQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);

            var post = await _context.Posts
                .ProjectTo<PostDto>(_mapper.ConfigurationProvider, new { userId = user?.Id ?? 0})
                .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

            if (post == null)
                throw new NotFoundException(nameof(Post), request.Id);

            return post;
        }
    }
}