using TwitterClone.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace TwitterClone.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<User> DomainUsers { get; set; }
        DbSet<Follow> Follows { get; set; }
        DbSet<Media> Medias { get; set; }
        DbSet<Post> Posts { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
