using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TwitterClone.Application.Common.Exceptions;
using TwitterClone.Application.Common.Interfaces;

namespace TwitterClone.Application.Notifications.Queries.GetNotifications
{
    public class GetNotificationsQueryHandler : IRequestHandler<GetNotificationsQuery, NotificationsVM>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUser;
        private readonly IMapper _mapper;

        public GetNotificationsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUser, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _currentUser = currentUser;
        }

        public async Task<NotificationsVM> Handle(GetNotificationsQuery request, CancellationToken cancellationToken)
        {
            var user = await _context.DomainUsers.FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUser.UserId, cancellationToken);
            if (user == null)
                throw new ForbiddenAccessException();

            var query = _context.Notifications
                .AsNoTracking()
                .Include(n => n.Post)
                .Where(n => n.ForUserId == user.Id);
                
            if (request.BeforeId.HasValue)
                query = query.Where(n => n.Id < request.BeforeId);

            var notifications = await query.OrderByDescending(n => n.Id)
                .ProjectTo<NotificationDto>(_mapper.ConfigurationProvider)
                .Take(request.Count ?? 20)
                .ToListAsync(cancellationToken);

            var totalUnread = await _context.Notifications
                .Where(n => n.ForUserId == user.Id && !n.Read)
                .CountAsync(cancellationToken);

            return new NotificationsVM
            {
                Notifications = notifications,
                TotalUnread = totalUnread
            };
        }
    }
}