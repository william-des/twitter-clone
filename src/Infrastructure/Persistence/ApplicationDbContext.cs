using TwitterClone.Application.Common.Interfaces;
using TwitterClone.Domain.Common;
using TwitterClone.Domain.Entities;
using TwitterClone.Infrastructure.Identity;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TwitterClone.Infrastructure.Persistence
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTime _dateTime;
        private readonly IDomainEventService _domainEventService;
        private readonly IUserNotifierService _userNotifierService;

        public DbSet<User> DomainUsers { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Media> Medias { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<RePost> RePosts { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions,
            ICurrentUserService currentUserService,
            IDomainEventService domainEventService,
            IUserNotifierService userNotifierService,
            IDateTime dateTime) : base(options, operationalStoreOptions)
        {
            _currentUserService = currentUserService;
            _domainEventService = domainEventService;
            _userNotifierService = userNotifierService;
            _dateTime = dateTime;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            await HandleAuditedEntities(cancellationToken);            

            var addedNotifications = ChangeTracker
                .Entries<Notification>()
                .Where(c => c.State == EntityState.Added)
                .Select(e => e.Entity)
                .ToList();

            var result = await base.SaveChangesAsync(cancellationToken);

            await SendNotifications(addedNotifications, cancellationToken);

            await DispatchEvents(); 

            return result;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        private async Task HandleAuditedEntities(CancellationToken cancellationToken)
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.Created = _dateTime.Now;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModified = _dateTime.Now;
                        break;
                }
            }

            var authorAuditedEntries = ChangeTracker.Entries<AuthorAuditableEntity>().Where(e => e.State == EntityState.Added);
            
            if(authorAuditedEntries.Any()) 
            {
                var currentUser = await DomainUsers
                    .FirstOrDefaultAsync(u => u.ApplicationUserId == _currentUserService.UserId, cancellationToken);

                foreach (var entry in authorAuditedEntries)
                {
                    entry.Entity.CreatedBy = currentUser;
                }
            }
        }

        private async Task DispatchEvents()
        {
            while (true)
            {
                var domainEventEntity = ChangeTracker.Entries<IHasDomainEvent>()
                    .Select(x => x.Entity.DomainEvents)
                    .SelectMany(x => x)
                    .Where(domainEvent => !domainEvent.IsPublished)
                    .FirstOrDefault();
                if (domainEventEntity == null) break;

                domainEventEntity.IsPublished = true;
                await _domainEventService.Publish(domainEventEntity);
            }
        }

        private async Task SendNotifications(IEnumerable<Notification> notifications, CancellationToken cancellationToken)
        {
            foreach (var notification in notifications)
{                var notificationWithRelateds = await Notifications
                    .Include(n => n.Post)
                    .Include(n => n.CreatedBy)
                    .Include(n => n.ForUser)
                    .FirstAsync(n => n.Id == notification.Id, cancellationToken);

                _userNotifierService.SendNotification(notificationWithRelateds);
            }
        }
    }
}
