using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Entities;

namespace TwitterClone.Application.Users.Queries.GetUserByApplicationId
{
    public class GetUserByApplicationIdQueryHandler : IRequestHandler<GetUserByApplicationIdQuery, UserDto>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetUserByApplicationIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserDto> Handle(GetUserByApplicationIdQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.ApplicationUserId == request.ApplicationUserId, cancellationToken);

            if (user == null)
                throw new NotFoundException(nameof(User), request.ApplicationUserId);

            return user;
        }
    }
}