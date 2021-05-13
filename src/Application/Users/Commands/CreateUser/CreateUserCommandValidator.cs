using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Users.Commands.CreateUser
{
    public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
    {
        private readonly IApplicationDbContext _context;
        
        public CreateUserCommandValidator(IApplicationDbContext context)
        {
            _context = context;

            RuleFor(p => p.FullName)
                .NotEmpty().WithMessage("FullName is required.")
                .Matches(@"[A-Za-zÀ-ÖØ-öø-ÿ\s]").WithMessage("FullName cannot contain special characters.")
                .MaximumLength(60).WithMessage("FullName must not exceed 60 characters.");

            RuleFor(p => p.Username)
                .NotEmpty().WithMessage("Username is required.")
                .MaximumLength(30).WithMessage("Lastname must not exceed 30 characters.")
                .Matches(@"[\w]").WithMessage("Only letters, digits and underscores allowed.")
                .MustAsync(BeAvailableUsername).WithMessage("Username isn't available.");
            
            RuleFor(p => p.ApplicationUserId)
                .NotEmpty().WithMessage("ApplicationUserId is required.")
                .MustAsync(NotBeRegistered).WithMessage("User already registered.");
        }

        public async Task<bool> BeAvailableUsername(CreateUserCommand model, string username, CancellationToken cancellationToken)
        {
            if(string.IsNullOrWhiteSpace(username))
                return false;
            
            var lowerUserName = username.Trim().ToLower();
            
            return await _context.DomainUsers
                .AllAsync(p => p.Username.ToLower() != lowerUserName, cancellationToken);
        }

        public async Task<bool> NotBeRegistered(CreateUserCommand model, string applicationUserId, CancellationToken cancellationToken)
        {
            return await _context.DomainUsers
                .AllAsync(p => p.ApplicationUserId != applicationUserId, cancellationToken);
        }
    }
}