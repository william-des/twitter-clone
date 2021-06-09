using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Application.Common.Models;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.Likes.EventHandlers
{
    public class LikeCreatedEventHandler : INotificationHandler<DomainEventNotification<LikeCreatedEvent>>
    {
        private readonly IApplicationDbContext _context;

        public LikeCreatedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DomainEventNotification<LikeCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var like = notification.DomainEvent.Item;

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == like.PostId, cancellationToken);
            if(post == null) 
                return;

            var alreadyNotified = await _context.Notifications.AnyAsync(
                    n => n.ForUserId == post.CreatedById && n.CreatedById == like.CreatedById && n.PostId == post.Id && n.Type == NotificationType.Like, 
                    cancellationToken);

            if(alreadyNotified)
                return;
            
            var notif = new Notification
            {
                ForUserId = post.CreatedById,
                PostId = post.Id,
                Type = NotificationType.Like,
            };
            
            _context.Notifications.Add(notif);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}