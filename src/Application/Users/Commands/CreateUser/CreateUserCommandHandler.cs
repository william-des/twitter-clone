using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Users.Commands.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _context;

        public CreateUserCommandHandler(ICurrentUserService currentUserService, IIdentityService identityService, IApplicationDbContext context) 
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
            _context = context;
        }

        public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            if (request.ApplicationUserId != _currentUserService.UserId 
                && !await _identityService.IsInRoleAsync(_currentUserService.UserId, "Administrator"))
            {
                throw new ForbiddenAccessException();
            }

            var entity = new User {
                ApplicationUserId = request.ApplicationUserId,
                Username = request.Username,
                FullName = request.FullName.Trim()
            };

            _context.DomainUsers.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            
            return entity.Id;
        }
    }
}