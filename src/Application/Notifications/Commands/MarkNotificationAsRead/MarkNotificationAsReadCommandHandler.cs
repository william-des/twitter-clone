using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Notifications.Commands.MarkNotificationAsRead
{
    public class MarkNotificationAsReadCommandHandler : IRequestHandler<MarkNotificationAsReadCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public MarkNotificationAsReadCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(MarkNotificationAsReadCommand request, CancellationToken cancellationToken)
        {
            var notification = await _context.Notifications
                .Include(n => n.ForUser)
                .FirstOrDefaultAsync(n => n.Id == request.Id, cancellationToken);

            if(notification == null)
                throw new NotFoundException(nameof(Notification), request.Id);

            if(notification.ForUser.ApplicationUserId != _currentUser.UserId)
                throw new ForbiddenAccessException();

            notification.Read = true;
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value; 
        }
    }
}