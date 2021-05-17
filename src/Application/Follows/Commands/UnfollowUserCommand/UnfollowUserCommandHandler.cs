using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Follows.Commands.UnfollowUserCommand
{
    public class UnfollowUserCommandHandler : IRequestHandler<UnfollowUserCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public UnfollowUserCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(UnfollowUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);

            if(user == null)
                throw new ForbiddenAccessException();

            var followed = await _context.DomainUsers.FirstOrDefaultAsync(d => d.Id == request.UserId, cancellationToken);
            if(followed == null)
                throw new NotFoundException(nameof(User), request.UserId);

            var follow = await _context.Follows.FirstOrDefaultAsync(f => f.FollowerId == user.Id && f.FollowedId == followed.Id, cancellationToken);
            if(follow != null) {
                _context.Follows.Remove(follow);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}