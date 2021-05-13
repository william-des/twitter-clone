using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Posts.Commands.CreatePost
{
    public class CreatePostCommandValidator : AbstractValidator<CreatePostCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreatePostCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(p => p.Content).NotEmpty().MaximumLength(280);
            RuleFor(p => p.MediaId).MustAsync(BeValidMediaId).WithMessage("Media doesn't exist");
        }

        public async Task<bool> BeValidMediaId(CreatePostCommand model, Guid? mediaId, CancellationToken cancellationToken)
        {
            if(mediaId == null || !mediaId.HasValue)
                return true;
            
            return await _context.Medias.AnyAsync(m => m.Id == mediaId, cancellationToken);
        }
    }
}