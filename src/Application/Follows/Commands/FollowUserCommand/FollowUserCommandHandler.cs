using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.Follows.Commands.FollowUserCommand
{
    public class FollowUserCommandHandler : IRequestHandler<FollowUserCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public FollowUserCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(FollowUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if(user == null)
                throw new ForbiddenAccessException();

            var followed = await _context.DomainUsers.FirstOrDefaultAsync(d => d.Id == request.UserId, cancellationToken);
            if(followed == null)
                throw new NotFoundException(nameof(User), request.UserId);

            var alreadyFollowed = await _context.Follows.AnyAsync(f => f.FollowedId == request.UserId && f.FollowerId == user.Id, cancellationToken);
            if(alreadyFollowed)
                return Unit.Value;

            var follow = new Follow { FollowedId = followed.Id, FollowerId = user.Id};

            follow.DomainEvents.Add(new FollowCreatedEvent(follow));

            _context.Follows.Add(follow);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}