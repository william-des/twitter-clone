using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Posts.Commands.CreateLike
{
    public class CreateLikeCommandHandler : IRequestHandler<CreateLikeCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public CreateLikeCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<Unit> Handle(CreateLikeCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(d => d.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if(user == null)
                throw new ForbiddenAccessException();

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostId, cancellationToken);
            if(post == null)
                throw new NotFoundException(nameof(Post), request.PostId);

            var alreadyLiked = await _context.Likes.AnyAsync(l => l.PostId == post.Id && l.CreatedById == user.Id, cancellationToken);
            if(!alreadyLiked) {
                _context.Likes.Add(new Like { PostId = post.Id });
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}