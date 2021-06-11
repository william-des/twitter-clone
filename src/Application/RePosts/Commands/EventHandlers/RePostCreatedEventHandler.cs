using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Application.Common.Models;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.RePosts.Commands.EventHandlers
{
    public class RePostCreatedEventHandler : INotificationHandler<DomainEventNotification<RePostCreatedEvent>>
    {
        private readonly IApplicationDbContext _context;

        public RePostCreatedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DomainEventNotification<RePostCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var rePost = notification.DomainEvent.Item;

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == rePost.PostId, cancellationToken);
            if(post == null) 
                return;

            var alreadyNotified = await _context.Notifications.AnyAsync(
                    n => n.ForUserId == post.CreatedById && n.CreatedById == rePost.CreatedById && n.PostId == post.Id && n.Type == NotificationType.RePost, 
                    cancellationToken);

            if(alreadyNotified)
                return;
            
            var notif = new Notification
            {
                ForUserId = post.CreatedById,
                Post = post,
                Type = NotificationType.RePost,
            };
            
            _context.Notifications.Add(notif);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}