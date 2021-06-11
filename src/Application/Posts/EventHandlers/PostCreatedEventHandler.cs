using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Application.Common.Models;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.Posts.EventHandlers
{
    public class PostCreatedEventHandler : INotificationHandler<DomainEventNotification<PostCreatedEvent>>
    {
        private readonly IApplicationDbContext _context;

        public PostCreatedEventHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DomainEventNotification<PostCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var post = notification.DomainEvent.Item;

            if(post.AnswerToId.HasValue)
            {
                var answeredPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == post.AnswerToId, cancellationToken);
                
                var answerNotification = new Notification
                {
                    ForUserId = answeredPost.CreatedById,
                    Post = post,
                    Type = NotificationType.Answer
                };
                _context.Notifications.Add(answerNotification);
            }


            var mentions = Regex.Matches(post.Content, @"@(\w+)").Select(m => m.Value[1..].ToLower()).ToList();
            var mentionedUsers = await _context.DomainUsers.Where(u => mentions.Contains(u.Username.ToLower())).ToListAsync(cancellationToken);

            foreach (var user in mentionedUsers)
            {
                var mentionNotification = new Notification
                {
                    ForUserId = user.Id,
                    Post = post,
                    Type = NotificationType.Mention
                };
                _context.Notifications.Add(mentionNotification);
            }

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}