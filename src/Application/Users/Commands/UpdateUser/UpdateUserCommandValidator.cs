using System;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Users.Commands.UpdateUser
{
    public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
    {
        private readonly IApplicationDbContext _context;
        
        public UpdateUserCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(u => u.FullName)
                .NotEmpty().WithMessage("FullName is required.")
                .Matches(@"[A-Za-zÀ-ÖØ-öø-ÿ\s]").WithMessage("FullName cannot contain special characters.")
                .MaximumLength(60);

            RuleFor(u => u.Description).MaximumLength(160);

            RuleFor(u => u.Location).MaximumLength(30);

            RuleFor(u => u.Website).MaximumLength(100);

            RuleFor(u => u.PictureId).MustAsync(BeValidMediaId).WithMessage("Picture doesn't exist");
            
            RuleFor(u => u.BannerId).MustAsync(BeValidMediaId).WithMessage("Banner doesn't exist");
        }

        public async Task<bool> BeValidMediaId(Guid? mediaId, CancellationToken cancellationToken)
        {
            if(!mediaId.HasValue)
                return true;

            return await _context.Medias.AnyAsync(m => m.Id == mediaId, cancellationToken);
        }
    }
}