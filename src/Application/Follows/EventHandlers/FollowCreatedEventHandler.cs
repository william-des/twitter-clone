using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Application.Common.Models;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.Follows.EventHandlers
{
    public class FollowCreatedEventHandler : INotificationHandler<DomainEventNotification<FollowCreatedEvent>>
    {
        private readonly IApplicationDbContext _context;

        public FollowCreatedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DomainEventNotification<FollowCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var follow = notification.DomainEvent.Item;

            var alreadyNotified = await _context.Notifications.AnyAsync(
                    n => n.ForUserId == follow.FollowedId && n.CreatedById == follow.FollowerId && n.Type == NotificationType.Follow, 
                    cancellationToken);

            if(alreadyNotified) 
                return;
            
            var notif = new Notification
            {
                ForUserId = follow.FollowedId,
                Type = NotificationType.Follow,
            };
            
            _context.Notifications.Add(notif);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}