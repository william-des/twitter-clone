using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;
using TwitterClone.Domain.Events;

namespace TwitterClone.Application.RePosts.Commands.CreateRePost
{
    public class CreateRePostCommandHandler : IRequestHandler<CreateRePostCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public CreateRePostCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(CreateRePostCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if(user == null)
                throw new ForbiddenAccessException();

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId, cancellationToken);
            if(post == null)
                throw new NotFoundException(nameof(Post), request.PostId);

            var alreadyRePosted = await _context.RePosts.AnyAsync(r => r.PostId == post.Id && r.CreatedById == user.Id, cancellationToken);
            if(alreadyRePosted) 
                return Unit.Value;

            var rePost = new RePost { PostId = post.Id };
            rePost.DomainEvents.Add(new RePostCreatedEvent(rePost));

            _context.RePosts.Add(rePost);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}