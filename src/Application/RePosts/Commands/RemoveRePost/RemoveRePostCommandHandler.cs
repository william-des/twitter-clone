using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.RePosts.Commands.RemoveRePost
{
    public class RemoveRePostCommandHandler : IRequestHandler<RemoveRePostCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public RemoveRePostCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }
        
        public async Task<Unit> Handle(RemoveRePostCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);

            if(user == null)
                throw new ForbiddenAccessException();

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId, cancellationToken);
            if(post == null)
                throw new NotFoundException(nameof(Post), request.PostId);

            var rePost = await _context.RePosts.FirstOrDefaultAsync(r => r.CreatedById == user.Id && r.PostId == request.PostId, cancellationToken);
            if(rePost != null) {
                _context.RePosts.Remove(rePost);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }   
    }
}