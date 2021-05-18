using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Commands.RemoveLike
{
    public class RemoveLikeCommandHandler : IRequestHandler<RemoveLikeCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public RemoveLikeCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }
        
        public async Task<Unit> Handle(RemoveLikeCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);

            if(user == null)
                throw new ForbiddenAccessException();

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId, cancellationToken);
            if(post == null)
                throw new NotFoundException(nameof(Post), request.PostId);

            var like = await _context.Likes.FirstOrDefaultAsync(l => l.CreatedById == user.Id && l.PostId == request.PostId, cancellationToken);
            if(like != null) {
                _context.Likes.Remove(like);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}